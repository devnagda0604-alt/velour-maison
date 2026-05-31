import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import T "../types/product";
import ProductLib "../lib/product";

mixin (
  accessControlState : AccessControl.AccessControlState,
  products : Map.Map<Common.ProductId, T.Product>,
  productState : { var nextProductId : Nat },
) {
  public query func listProducts() : async [T.ProductPublic] {
    ProductLib.listAll(products);
  };

  public query func listProductsByCollection(collection : T.Collection) : async [T.ProductPublic] {
    ProductLib.listByCollection(products, collection);
  };

  public query func getProduct(id : Common.ProductId) : async ?T.ProductPublic {
    ProductLib.getById(products, id);
  };

  public shared ({ caller }) func seedProducts(entries : [{
    name : Text;
    description : Text;
    material : Text;
    price : Nat;
    collection : T.Collection;
    images : [Text];
    sizeStocks : [T.SizeStock];
    rarityMessage : Text;
  }]) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can seed products");
    };
    var count = 0;
    for (e in entries.values()) {
      ignore ProductLib.create(
        products, productState,
        e.name, e.description, e.material, e.price,
        e.collection, e.images, e.sizeStocks, e.rarityMessage,
      );
      count += 1;
    };
    count;
  };

  public shared ({ caller }) func updateProductStock(
    id : Common.ProductId,
    sizeStocks : [T.SizeStock],
  ) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update stock");
    };
    ProductLib.updateStock(products, id, sizeStocks);
  };
};
