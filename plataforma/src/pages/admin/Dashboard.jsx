import React from 'react';
import DashboardSummary from '../../components/admin/DashboardSummary';
import RecentPropertiesList from '../../components/admin/RecentPropertiesList';

const Dashboard = () => {
    return (
        <div>
            <h2 className="mb-4">Panel de Administración</h2>
            <DashboardSummary />
            <RecentPropertiesList />
        </div>
    );
};

export default Dashboard;