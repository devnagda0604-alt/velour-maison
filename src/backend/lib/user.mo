import Map "mo:core/Map";
import Set "mo:core/Set";
import Common "../types/common";
import UT "../types/user";
import Time "mo:core/Time";

module {
  public func getProfile(
    profiles : Map.Map<Common.UserId, UT.UserProfile>,
    userId : Common.UserId,
  ) : ?UT.UserProfilePublic {
    switch (profiles.get(userId)) {
      case (?p) { ?toPublic(p) };
      case null { null };
    };
  };

  public func upsertProfile(
    profiles : Map.Map<Common.UserId, UT.UserProfile>,
    userId : Common.UserId,
    name : Text,
    email : Text,
    preferences : UT.UserPreferences,
  ) : UT.UserProfilePublic {
    let now = Time.now();
    let profile : UT.UserProfile = switch (profiles.get(userId)) {
      case (?existing) {
        existing.name := name;
        existing.email := email;
        existing.preferences := preferences;
        existing.updatedAt := now;
        existing;
      };
      case null {
        let p : UT.UserProfile = {
          id = userId;
          var name = name;
          var email = email;
          var preferences = preferences;
          createdAt = now;
          var updatedAt = now;
        };
        profiles.add(userId, p);
        p;
      };
    };
    toPublic(profile);
  };

  public func getWishlist(
    wishlists : Map.Map<Common.UserId, Set.Set<Common.ProductId>>,
    userId : Common.UserId,
  ) : [UT.WishlistItem] {
    switch (wishlists.get(userId)) {
      case (?set) {
        set.values().map<Common.ProductId, UT.WishlistItem>(func(productId) {
          { productId; addedAt = 0 }
        }).toArray();
      };
      case null { [] };
    };
  };

  public func addWishlistItem(
    wishlists : Map.Map<Common.UserId, Set.Set<Common.ProductId>>,
    userId : Common.UserId,
    productId : Common.ProductId,
  ) : () {
    switch (wishlists.get(userId)) {
      case (?set) { set.add(productId) };
      case null {
        let set = Set.empty<Common.ProductId>();
        set.add(productId);
        wishlists.add(userId, set);
      };
    };
  };

  public func removeWishlistItem(
    wishlists : Map.Map<Common.UserId, Set.Set<Common.ProductId>>,
    userId : Common.UserId,
    productId : Common.ProductId,
  ) : () {
    switch (wishlists.get(userId)) {
      case (?set) { set.remove(productId) };
      case null {};
    };
  };

  public func toPublic(p : UT.UserProfile) : UT.UserProfilePublic {
    {
      id = p.id;
      name = p.name;
      email = p.email;
      preferences = p.preferences;
      createdAt = p.createdAt;
      updatedAt = p.updatedAt;
    };
  };

  public func enrollVIP(
    profiles : Map.Map<Common.UserId, UT.UserProfile>,
    userId : Common.UserId,
  ) : () {
    let now = Time.now();
    switch (profiles.get(userId)) {
      case (?p) {
        p.preferences := { p.preferences with vipStatus = true; vipEnrolledAt = ?now };
        p.updatedAt := now;
      };
      case null {
        let p : UT.UserProfile = {
          id = userId;
          var name = "";
          var email = "";
          var preferences = {
            newsletter = false;
            sizePreference = null;
            vipStatus = true;
            vipEnrolledAt = ?now;
            fitQuizResult = null;
          };
          createdAt = now;
          var updatedAt = now;
        };
        profiles.add(userId, p);
      };
    };
  };

  public func saveFitQuizResult(
    profiles : Map.Map<Common.UserId, UT.UserProfile>,
    userId : Common.UserId,
    result : UT.FitQuizResultInput,
  ) : () {
    let now = Time.now();
    let fitResult : UT.FitQuizResult = {
      recommendedSize = result.recommendedSize;
      confidenceScore = result.confidenceScore;
      bodyType = result.bodyType;
      fitPreference = result.fitPreference;
      completedAt = now;
    };
    switch (profiles.get(userId)) {
      case (?p) {
        p.preferences := { p.preferences with fitQuizResult = ?fitResult };
        p.updatedAt := now;
      };
      case null {
        let p : UT.UserProfile = {
          id = userId;
          var name = "";
          var email = "";
          var preferences = {
            newsletter = false;
            sizePreference = null;
            vipStatus = false;
            vipEnrolledAt = null;
            fitQuizResult = ?fitResult;
          };
          createdAt = now;
          var updatedAt = now;
        };
        profiles.add(userId, p);
      };
    };
  };

  public func getVIPStatus(
    profiles : Map.Map<Common.UserId, UT.UserProfile>,
    userId : Common.UserId,
  ) : Bool {
    switch (profiles.get(userId)) {
      case (?p) { p.preferences.vipStatus };
      case null { false };
    };
  };

  public func getFitQuizResult(
    profiles : Map.Map<Common.UserId, UT.UserProfile>,
    userId : Common.UserId,
  ) : ?UT.FitQuizResult {
    switch (profiles.get(userId)) {
      case (?p) { p.preferences.fitQuizResult };
      case null { null };
    };
  };
};
