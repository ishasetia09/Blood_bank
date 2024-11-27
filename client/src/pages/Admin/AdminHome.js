import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-felx flex-column mt-4">
          <h1>
            Welcome Admin <i className="text-success">{user?.name}</i>
          </h1>
          <h3>Manage Blood Bank App </h3>
          <hr />
          <p>
            TheBlood Bank Management  is a comprehensive dashboard designed to
            streamline the administration of blood donation, inventory, and distribution processes.
            It offers a real-time overview of blood products, showing current stock levels, types
            (e.g., whole blood, red cells, plasma), and expiration dates. Administrators can easily track donations,
            manage donor information, and send reminders for upcoming eligibility or donations.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
