'use client';

import { useQuery } from '@tanstack/react-query';
import { projectsAPI, buildingsAPI, unitsAPI } from '../../lib/api';
import {
  Building2,
  Grid3X3,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
} from 'lucide-react';

export default function DashboardPage() {
  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: projectsAPI.getAll,
  });

  const { data: buildings = [] } = useQuery({
    queryKey: ['buildings'],
    queryFn: buildingsAPI.getAll,
  });

  const { data: units = [] } = useQuery({
    queryKey: ['units'],
    queryFn: unitsAPI.getAll,
  });

  const stats = [
    {
      name: 'Total Projects',
      value: projects.length,
      icon: Building2,
      color: 'bg-blue-500',
    },
    {
      name: 'Total Buildings',
      value: buildings.length,
      icon: Building2,
      color: 'bg-green-500',
    },
    {
      name: 'Total Units',
      value: units.length,
      icon: Grid3X3,
      color: 'bg-purple-500',
    },
    {
      name: 'Available Units',
      value: units.filter((unit: any) => unit.status === 'Available').length,
      icon: Grid3X3,
      color: 'bg-yellow-500',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'Unit Locked',
      description: 'Unit A-101 was locked by John Doe',
      time: '2 minutes ago',
    },
    {
      id: 2,
      type: 'Price Updated',
      description: 'Price list for Building A was updated',
      time: '1 hour ago',
    },
    {
      id: 3,
      type: 'New Reservation',
      description: 'Unit B-205 was reserved by Jane Smith',
      time: '3 hours ago',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your BIM Booking & Asset Management System</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6"
          >
            <dt>
              <div className={`absolute rounded-md p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </dd>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="flow-root">
            <ul className="-mb-8">
              {recentActivity.map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== recentActivity.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                          <Calendar className="h-4 w-4 text-white" />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">
                            {activity.description}
                          </p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <button className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <Building2 className="mx-auto h-12 w-12 text-gray-400" />
              <span className="mt-2 block text-sm font-semibold text-gray-900">
                Add New Project
              </span>
            </button>
            <button className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <Grid3X3 className="mx-auto h-12 w-12 text-gray-400" />
              <span className="mt-2 block text-sm font-semibold text-gray-900">
                View Grid
              </span>
            </button>
            <button className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
              <span className="mt-2 block text-sm font-semibold text-gray-900">
                Manage Prices
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
