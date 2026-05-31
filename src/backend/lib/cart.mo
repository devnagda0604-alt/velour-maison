import Map "mo:core/Map";
import Common "../types/common";
import CT "../types/cart";
import PT "../types/product";
import Time "mo:core/Time";
import Array "mo:core/Array";

module {
  public func getCart(carts : Map.Map<Common.UserId, CT.Cart>, owner : Common.UserId) : CT.CartPublic {
    switch (carts.get(owner)) {
      case (?cart) { { owner = cart.owner; items = cart.items; updatedAt = cart.updatedAt } };
      case null { { owner; items = []; updatedAt = Time.now() } };
    };
  };

  public func addItem(
    carts : Map.Map<Common.UserId, CT.Cart>,
    owner : Common.UserId,
    productId : Common.ProductId,
    size : PT.Size,
    quantity : Nat,
  ) : CT.CartPublic {
    let now = Time.now();
    let existingItems = switch (carts.get(owner)) {
      case (?cart) { cart.items };
      case null { [] };
    };
    // Check if item already exists — if so, increase quantity
    let found = existingItems.find(func(item : CT.CartItem) : Bool {
      item.productId == productId and item.size == size
    });
    let newItems = switch (found) {
      case (?_) {
        existingItems.map(func(item) {
          if (item.productId == productId and item.size == size) {
            { item with quantity = item.quantity + quantity }
          } else { item }
        });
      };
      case null {
        existingItems.concat([{ productId; size; quantity }]);
      };
    };
    let cart : CT.Cart = { owner; var items = newItems; updatedAt = now };
    carts.add(owner, cart);
    { owner; items = newItems; updatedAt = now };
  };

  public func removeItem(
    carts : Map.Map<Common.UserId, CT.Cart>,
    owner : Common.UserId,
    productId : Common.ProductId,
    size : PT.Size,
  ) : CT.CartPublic {
    let now = Time.now();
    let existingItems = switch (carts.get(owner)) {
      case (?cart) { cart.items };
      case null { [] };
    };
    let newItems = existingItems.filter(func(item : CT.CartItem) : Bool {
      not (item.productId == productId and item.size == size)
    });
    let cart : CT.Cart = { owner; var items = newItems; updatedAt = now };
    carts.add(owner, cart);
    { owner; items = newItems; updatedAt = now };
  };

  public func updateQuantity(
    carts : Map.Map<Common.UserId, CT.Cart>,
    owner : Common.UserId,
    productId : Common.ProductId,
    size : PT.Size,
    quantity : Nat,
  ) : CT.CartPublic {
    let now = Time.now();
    let existingItems = switch (carts.get(owner)) {
      case (?cart) { cart.items };
      case null { [] };
    };
    let newItems = if (quantity == 0) {
      existingItems.filter(func(item : CT.CartItem) : Bool {
        not (item.productId == productId and item.size == size)
      });
    } else {
      existingItems.map(func(item) {
        if (item.productId == productId and item.size == size) {
          { item with quantity }
        } else { item }
      });
    };
    let cart : CT.Cart = { owner; var items = newItems; updatedAt = now };
    carts.add(owner, cart);
    { owner; items = newItems; updatedAt = now };
  };

  public func clearCart(carts : Map.Map<Common.UserId, CT.Cart>, owner : Common.UserId) : () {
    let now = Time.now();
    let cart : CT.Cart = { owner; var items = []; updatedAt = now };
    carts.add(owner, cart);
  };
};
