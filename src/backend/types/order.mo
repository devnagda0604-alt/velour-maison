import Common "common";
import Product "product";

module {
  public type OrderStatus = {
    #Pending;
    #Confirmed;
    #Shipped;
    #Delivered;
    #Cancelled;
  };

  public type OrderItem = {
    productId : Common.ProductId;
    productName : Text;
    size : Product.Size;
    quantity : Nat;
    unitPrice : Nat;
  };

  public type ShippingAddress = {
    fullName : Text;
    addressLine1 : Text;
    addressLine2 : Text;
    city : Text;
    state : Text;
    postalCode : Text;
    country : Text;
  };

  public type BillingInfo = {
    fullName : Text;
    email : Text;
    addressLine1 : Text;
    city : Text;
    postalCode : Text;
    country : Text;
  };

  public type Order = {
    id : Common.OrderId;
    owner : Common.UserId;
    items : [OrderItem];
    shippingAddress : ShippingAddress;
    billingInfo : BillingInfo;
    var status : OrderStatus;
    totalAmount : Nat;
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
  };

  public type OrderPublic = {
    id : Common.OrderId;
    owner : Common.UserId;
    items : [OrderItem];
    shippingAddress : ShippingAddress;
    billingInfo : BillingInfo;
    status : OrderStatus;
    totalAmount : Nat;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };
};
