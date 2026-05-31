import Map "mo:core/Map";
import Time "mo:core/Time";
import Common "../types/common";
import T "../types/product";

module {
  public type State = {
    products : Map.Map<Common.ProductId, T.Product>;
    state : { var nextProductId : Nat };
  };

  public func toPublic(p : T.Product) : T.ProductPublic {
    {
      id = p.id;
      name = p.name;
      description = p.description;
      material = p.material;
      price = p.price;
      collection = p.collection;
      images = p.images;
      sizeStocks = p.sizeStocks;
      totalStock = p.totalStock;
      rarityMessage = p.rarityMessage;
      createdAt = p.createdAt;
    };
  };

  public func listAll(products : Map.Map<Common.ProductId, T.Product>) : [T.ProductPublic] {
    products.values().map<T.Product, T.ProductPublic>(toPublic).toArray();
  };

  public func listByCollection(products : Map.Map<Common.ProductId, T.Product>, collection : T.Collection) : [T.ProductPublic] {
    products.values().filter(func(p : T.Product) : Bool { p.collection == collection }).map<T.Product, T.ProductPublic>(toPublic).toArray();
  };

  public func getById(products : Map.Map<Common.ProductId, T.Product>, id : Common.ProductId) : ?T.ProductPublic {
    switch (products.get(id)) {
      case (?p) { ?toPublic(p) };
      case null { null };
    };
  };

  public func create(
    products : Map.Map<Common.ProductId, T.Product>,
    state : { var nextProductId : Nat },
    name : Text,
    description : Text,
    material : Text,
    price : Nat,
    collection : T.Collection,
    images : [Text],
    sizeStocks : [T.SizeStock],
    rarityMessage : Text,
  ) : T.ProductPublic {
    let id = state.nextProductId;
    state.nextProductId += 1;
    let totalStock = sizeStocks.foldLeft(0, func(acc, ss) { acc + ss.stock });
    let p : T.Product = {
      id;
      name;
      description;
      material;
      price;
      collection;
      images;
      var sizeStocks = sizeStocks;
      var totalStock = totalStock;
      rarityMessage;
      createdAt = Time.now();
    };
    products.add(id, p);
    toPublic(p);
  };

  public func updateStock(
    products : Map.Map<Common.ProductId, T.Product>,
    id : Common.ProductId,
    sizeStocks : [T.SizeStock],
  ) : Bool {
    switch (products.get(id)) {
      case (?p) {
        p.sizeStocks := sizeStocks;
        p.totalStock := sizeStocks.foldLeft<T.SizeStock, Nat>(0, func(acc, ss) { acc + ss.stock });
        true;
      };
      case null { false };
    };
  };
};
