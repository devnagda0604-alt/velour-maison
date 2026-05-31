import Common "common";

module {
  public type FitQuizResult = {
    recommendedSize : Text;
    confidenceScore : Nat;
    bodyType : Text;
    fitPreference : Text;
    completedAt : Common.Timestamp;
  };

  public type FitQuizResultInput = {
    recommendedSize : Text;
    confidenceScore : Nat;
    bodyType : Text;
    fitPreference : Text;
  };

  public type UserPreferences = {
    newsletter : Bool;
    sizePreference : ?Text;
    vipStatus : Bool;
    vipEnrolledAt : ?Common.Timestamp;
    fitQuizResult : ?FitQuizResult;
  };

  public type UserProfile = {
    id : Common.UserId;
    var name : Text;
    var email : Text;
    var preferences : UserPreferences;
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
  };

  public type UserProfilePublic = {
    id : Common.UserId;
    name : Text;
    email : Text;
    preferences : UserPreferences;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type WishlistItem = {
    productId : Common.ProductId;
    addedAt : Common.Timestamp;
  };
};
