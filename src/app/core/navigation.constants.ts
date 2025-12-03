export interface NavItem {
  label: string;
  icon: string;
  route: string;
}

export const NAVIGATION_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
  { label: 'Reports & Analytics', icon: 'analytics', route: '/reports' },
  { label: 'Users', icon: 'groups', route: '/users' },
  { label: 'Emergency', icon: 'warning', route: '/emergency' },
  { label: 'Complaints', icon: 'report', route: '/complaints' }, // fixed
  { label: 'Attendance', icon: 'description', route: '/attendance' }, // fixed
  { label: 'Leaves', icon: 'event_busy', route: '/leaves' },
  { label: 'Hostel Mess', icon: 'restaurant', route: '/mess' },
  { label: 'Fees', icon: 'payments', route: '/fees' },
  { label: 'Amenities', icon: 'exercise', route: '/amenities' }, // closest match
  { label: 'Inventory', icon: 'inventory_2', route: '/inventory' },
  { label: 'Visitors', icon: 'person_add', route: '/visitors' },
  { label: 'Community', icon: 'chat', route: '/community' },
  { label: 'Laundry', icon: 'laundry', route: '/laundry' }, // fixed
  { label: 'Rooms Allocation', icon: 'meeting_room', route: '/rooms-allocation' },
  { label: 'Parcel', icon: 'inventory', route: '/parcel' }
];
