import { useNavigate } from "react-router-dom";
import "./Avatar.scss";

const Avatar = ({ user, onSignOut }) => {
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRandomColor = (name) => {
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
      "#98D8C8",
      "#F7DC6F",
    ];
    const index = name ? name.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  const handleAvatarClick = () => {
    navigate("/gallery");
  };

  const displayName = user.name || user.displayName || "User";
  const initials = getInitials(displayName);
  const backgroundColor = getRandomColor(displayName);

  return (
    <div className="avatar-container">
      <div className="avatar__clickable" onClick={handleAvatarClick}>
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={displayName}
            className="avatar__image"
          />
        ) : (
          <div className="avatar__initials" style={{ backgroundColor }}>
            {initials}
          </div>
        )}
      </div>
      <div className="avatar__dropdown">
        <div className="avatar__info">
          <span className="avatar__name">{displayName}</span>
          {/* <span className="avatar__credits">{user.credits} credits</span> */}
        </div>
        <button onClick={onSignOut} className="avatar__signout">
          <i className="icon icon-sign-out"></i>
          SIGN OUT
        </button>
      </div>
    </div>
  );
};

export { Avatar };
