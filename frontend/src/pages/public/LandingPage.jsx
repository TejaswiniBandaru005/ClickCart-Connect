import { useNavigate, useSearchParams } from "react-router-dom";

const roles = [
  {
    key: "customer",
    title: "Customer",
    description: "Browse products, add items to cart, track orders, and shop securely.",
    icon: "🛍️",
    color: "purple",
  },
  {
    key: "seller",
    title: "Seller",
    description: "Manage listings, inventory, order fulfillment, and sales insights.",
    icon: "🏪",
    color: "green",
  },
  {
    key: "admin",
    title: "Admin",
    description: "Monitor customers, sellers, products, finances, and platform activity.",
    icon: "🛡️",
    color: "blue",
  },
];

function LandingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleRoleClick = (role) => {
    const nextRole = searchParams.get("role") || role;
    navigate(`/login?role=${nextRole}`);
  };

  return (
    <div className="landing-page">
      <div className="landing-shell">
        <div className="landing-badge">ShopSphere</div>
        <h1>Choose your portal</h1>
        <p className="landing-subtitle">
          Access the right dashboard for your role and continue managing your store or shopping experience.
        </p>

        <div className="role-cards">
          {roles.map((role) => (
            <button
              key={role.key}
              type="button"
              className={`role-card role-card-${role.color}`}
              onClick={() => handleRoleClick(role.key)}
            >
              <div className="role-icon">{role.icon}</div>
              <h2>{role.title}</h2>
              <p>{role.description}</p>
              <span>Continue →</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
