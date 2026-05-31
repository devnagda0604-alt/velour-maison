import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import OT "../types/order";
import CT "../types/cart";
import PT "../types/product";
import OrderLib "../lib/order";
import CartLib "../lib/cart";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orders : Map.Map<Common.OrderId, OT.Order>,
  orderState : { var nextOrderId : Nat },
  carts : Map.Map<Common.UserId, CT.Cart>,
  products : Map.Map<Common.ProductId, PT.Product>,
) {
  public shared ({ caller }) func createOrder(
    shippingAddress : OT.ShippingAddress,
    billingInfo : OT.BillingInfo,
  ) : async OT.OrderPublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let cartPublic = CartLib.getCart(carts, caller);
    if (cartPublic.items.size() == 0) {
      Runtime.trap("Cart is empty");
    };
    let order = OrderLib.createFromCart(
      orders, orderState, caller,
      cartPublic.items, products,
      shippingAddress, billingInfo,
    );
    CartLib.clearCart(carts, caller);
    order;
  };

  public query ({ caller }) func getOrder(orderId : Common.OrderId) : async ?OT.OrderPublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    OrderLib.getById(orders, caller, orderId);
  };

  public query ({ caller }) func listOrders() : async [OT.OrderPublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    OrderLib.listByOwner(orders, caller);
  };
};
