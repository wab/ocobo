import { Outlet } from '@remix-run/react';

export default function Index() {
  return (
    <div>
      <div>client layout</div>
      <Outlet />
    </div>
  );
}
