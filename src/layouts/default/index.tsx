import { Outlet } from '@umijs/max';

export default () => {
    return (
        <div className="w-full h-full p-4 bg-white">
            <Outlet />
        </div>
    );
};
