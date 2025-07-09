import React from 'react';
// import DashboardSummary from '../../components/admin/DashboardSummary';
// import RecentPropertiesList from '../../components/admin/RecentPropertiesList';
import AdminTable from '../../components/admin/AdminTable';

const Dashboard = () => {
    return (
        <div>
            <h2 className="mb-4">Panel de Administración de la Pagina</h2>
            {/* <DashboardSummary />
            <RecentPropertiesList /> */}
            <AdminTable/>
        </div>
    );
};

export default Dashboard;