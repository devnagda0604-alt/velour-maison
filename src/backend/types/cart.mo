import Common "common";
import Product "product";

module {
  public type CartItem = {
    productId : Common.ProductId;
    size : Product.Size;
    quantity : Nat;
  };

  public type Cart = {
    owner : Common.UserId;
    var items : [CartItem];
    updatedAt : Common.Timestamp;
  };

  public type CartPublic = {
    owner : Common.UserId;
    items : [CartItem];
    updatedAt : Common.Timestamp;
  };
};
