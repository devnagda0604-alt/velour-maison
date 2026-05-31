import Map "mo:core/Map";
import Set "mo:core/Set";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Common "types/common";
import CT "types/cart";
import OT "types/order";
import UT "types/user";
import PT "types/product";
import ProductApi "mixins/product-api";
import CartApi "mixins/cart-api";
import OrderApi "mixins/order-api";
import UserApi "mixins/user-api";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Product catalog state
  let products = Map.empty<Common.ProductId, PT.Product>();
  let productState = { var nextProductId : Nat = 0 };
  include ProductApi(accessControlState, products, productState);

  // Cart state (per user)
  let carts = Map.empty<Common.UserId, CT.Cart>();
  include CartApi(accessControlState, carts);

  // Order state
  let orders = Map.empty<Common.OrderId, OT.Order>();
  let orderState = { var nextOrderId : Nat = 0 };
  include OrderApi(accessControlState, orders, orderState, carts, products);

  // User profile & wishlist state
  let profiles = Map.empty<Common.UserId, UT.UserProfile>();
  let wishlists = Map.empty<Common.UserId, Set.Set<Common.ProductId>>();
  include UserApi(accessControlState, profiles, wishlists);
};

