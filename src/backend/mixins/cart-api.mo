import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import CT "../types/cart";
import PT "../types/product";
import CartLib "../lib/cart";

mixin (
  accessControlState : AccessControl.AccessControlState,
  carts : Map.Map<Common.UserId, CT.Cart>,
) {
  public query ({ caller }) func getCart() : async CT.CartPublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CartLib.getCart(carts, caller);
  };

  public shared ({ caller }) func addToCart(
    productId : Common.ProductId,
    size : PT.Size,
    quantity : Nat,
  ) : async CT.CartPublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CartLib.addItem(carts, caller, productId, size, quantity);
  };

  public shared ({ caller }) func removeFromCart(
    productId : Common.ProductId,
    size : PT.Size,
  ) : async CT.CartPublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CartLib.removeItem(carts, caller, productId, size);
  };

  public shared ({ caller }) func updateCartQuantity(
    productId : Common.ProductId,
    size : PT.Size,
    quantity : Nat,
  ) : async CT.CartPublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CartLib.updateQuantity(carts, caller, productId, size, quantity);
  };

  public shared ({ caller }) func clearCart() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CartLib.clearCart(carts, caller);
  };
};
