import Map "mo:core/Map";
import Set "mo:core/Set";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import UT "../types/user";
import UserLib "../lib/user";

mixin (
  accessControlState : AccessControl.AccessControlState,
  profiles : Map.Map<Common.UserId, UT.UserProfile>,
  wishlists : Map.Map<Common.UserId, Set.Set<Common.ProductId>>,
) {
  public query ({ caller }) func getCallerUserProfile() : async ?UT.UserProfilePublic {
    UserLib.getProfile(profiles, caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(
    name : Text,
    email : Text,
    preferences : UT.UserPreferences,
  ) : async UT.UserProfilePublic {
    UserLib.upsertProfile(profiles, caller, name, email, preferences);
  };

  public query ({ caller }) func getUserProfile(user : Common.UserId) : async ?UT.UserProfilePublic {
    UserLib.getProfile(profiles, user);
  };

  public query ({ caller }) func getWishlist() : async [UT.WishlistItem] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    UserLib.getWishlist(wishlists, caller);
  };

  public shared ({ caller }) func addToWishlist(productId : Common.ProductId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    UserLib.addWishlistItem(wishlists, caller, productId);
  };

  public shared ({ caller }) func removeFromWishlist(productId : Common.ProductId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    UserLib.removeWishlistItem(wishlists, caller, productId);
  };
  public shared ({ caller }) func enrollVIP() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    UserLib.enrollVIP(profiles, caller);
  };

  public shared ({ caller }) func saveFitQuizResult(result : UT.FitQuizResultInput) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    UserLib.saveFitQuizResult(profiles, caller, result);
  };

  public query ({ caller }) func getVIPStatus() : async Bool {
    UserLib.getVIPStatus(profiles, caller);
  };

  public query ({ caller }) func getFitQuizResult() : async ?UT.FitQuizResult {
    UserLib.getFitQuizResult(profiles, caller);
  };
};
