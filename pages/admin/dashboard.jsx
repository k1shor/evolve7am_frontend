import AdminSidebar from "../Components/Admin/AdminSidebar";

const dashboard = () => {
    return ( <>
    <div className="flex">
        <div className="w-1/4">
            <AdminSidebar/>
        </div>
        <div className="w-3/4">
            Welcome to Admin Dashboard
        </div>
    </div>

    </> );
}
 
export default dashboard;