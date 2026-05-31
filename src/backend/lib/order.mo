import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Common "../types/common";
import OT "../types/order";
import CT "../types/cart";
import PT "../types/product";

module {
  public func toPublic(o : OT.Order) : OT.OrderPublic {
    {
      id = o.id;
      owner = o.owner;
      items = o.items;
      shippingAddress = o.shippingAddress;
      billingInfo = o.billingInfo;
      status = o.status;
      totalAmount = o.totalAmount;
      createdAt = o.createdAt;
      updatedAt = o.updatedAt;
    };
  };

  public func createFromCart(
    orders : Map.Map<Common.OrderId, OT.Order>,
    state : { var nextOrderId : Nat },
    owner : Common.UserId,
    cartItems : [CT.CartItem],
    products : Map.Map<Common.ProductId, PT.Product>,
    shippingAddress : OT.ShippingAddress,
    billingInfo : OT.BillingInfo,
  ) : OT.OrderPublic {
    let now = Time.now();
    let id = state.nextOrderId;
    state.nextOrderId += 1;
    let orderItems : [OT.OrderItem] = cartItems.map<CT.CartItem, OT.OrderItem>(func(ci) {
      switch (products.get(ci.productId)) {
        case (?p) {
          {
            productId = ci.productId;
            productName = p.name;
            size = ci.size;
            quantity = ci.quantity;
            unitPrice = p.price;
          };
        };
        case null {
          {
            productId = ci.productId;
            productName = "Unknown";
            size = ci.size;
            quantity = ci.quantity;
            unitPrice = 0;
          };
        };
      };
    });
    let totalAmount = orderItems.foldLeft(0, func(acc, item) {
      acc + item.unitPrice * item.quantity
    });
    let order : OT.Order = {
      id;
      owner;
      items = orderItems;
      shippingAddress;
      billingInfo;
      var status = #Pending;
      totalAmount;
      createdAt = now;
      var updatedAt = now;
    };
    orders.add(id, order);
    toPublic(order);
  };

  public func getById(
    orders : Map.Map<Common.OrderId, OT.Order>,
    owner : Common.UserId,
    orderId : Common.OrderId,
  ) : ?OT.OrderPublic {
    switch (orders.get(orderId)) {
      case (?o) {
        if (Principal.equal(o.owner, owner)) { ?toPublic(o) } else { null };
      };
      case null { null };
    };
  };

  public func listByOwner(
    orders : Map.Map<Common.OrderId, OT.Order>,
    owner : Common.UserId,
  ) : [OT.OrderPublic] {
    orders.values().filter(func(o : OT.Order) : Bool {
      Principal.equal(o.owner, owner)
    }).map<OT.Order, OT.OrderPublic>(toPublic).toArray();
  };
};
