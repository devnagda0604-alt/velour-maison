import Common "common";

module {
  public type Collection = {
    #Atelier;
    #Heritage;
    #Comfort;
  };

  public type Size = {
    #XS;
    #S;
    #M;
    #L;
    #XL;
    #XXL;
  };

  public type SizeStock = {
    size : Size;
    stock : Nat;
  };

  public type Product = {
    id : Common.ProductId;
    name : Text;
    description : Text;
    material : Text;
    price : Nat; // in cents
    collection : Collection;
    images : [Text];
    var sizeStocks : [SizeStock];
    var totalStock : Nat;
    rarityMessage : Text;
    createdAt : Common.Timestamp;
  };

  // Shared/public boundary type (no var fields)
  public type ProductPublic = {
    id : Common.ProductId;
    name : Text;
    description : Text;
    material : Text;
    price : Nat;
    collection : Collection;
    images : [Text];
    sizeStocks : [SizeStock];
    totalStock : Nat;
    rarityMessage : Text;
    createdAt : Common.Timestamp;
  };
};
