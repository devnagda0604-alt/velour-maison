import Map "mo:core/Map";
import Set "mo:core/Set";
import NewUT "types/user";
import Common "types/common";

module {
  // Old types (inlined from .old/src/backend/types/user.mo)
  type OldUserPreferences = {
    newsletter : Bool;
    sizePreference : ?Text;
  };

  type OldUserProfile = {
    id : Common.UserId;
    var name : Text;
    var email : Text;
    var preferences : OldUserPreferences;
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
  };

  type OldActor = {
    profiles : Map.Map<Common.UserId, OldUserProfile>;
  };

  type NewActor = {
    profiles : Map.Map<Common.UserId, NewUT.UserProfile>;
  };

  public func run(old : OldActor) : NewActor {
    let profiles = old.profiles.map<Common.UserId, OldUserProfile, NewUT.UserProfile>(
      func(_id, p) {
        {
          id = p.id;
          var name = p.name;
          var email = p.email;
          var preferences = {
            newsletter = p.preferences.newsletter;
            sizePreference = p.preferences.sizePreference;
            vipStatus = false;
            vipEnrolledAt = null;
            fitQuizResult = null;
          };
          createdAt = p.createdAt;
          var updatedAt = p.updatedAt;
        }
      }
    );
    { profiles };
  };
};
