'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { buildingsAPI, gridAPI } from '../../../lib/api';
import { Building2, Lock, Unlock, Eye, Filter, Grid3X3 } from 'lucide-react';

export default function GridPage() {
  const [selectedBuilding, setSelectedBuilding] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const { data: buildings = [] } = useQuery({
    queryKey: ['buildings'],
    queryFn: buildingsAPI.getAll,
  });

  const { data: gridData = [], isLoading } = useQuery({
    queryKey: ['grid', selectedBuilding],
    queryFn: () => selectedBuilding ? gridAPI.getGridData(selectedBuilding) : [],
    enabled: !!selectedBuilding,
  });

  const handleLockUnit = async (unitId: number) => {
    try {
      await gridAPI.lockUnit(unitId, 'Locked from grid view');
      // Refetch data
    } catch (error) {
      console.error('Failed to lock unit:', error);
    }
  };

  const handleUnlockUnit = async (lockId: number) => {
    try {
      await gridAPI.unlockUnit(lockId);
      // Refetch data
    } catch (error) {
      console.error('Failed to unlock unit:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Locked':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Reserved':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Sold':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredData = gridData.filter((unit: any) => {
    if (filterStatus === 'all') return true;
    return unit.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Grid View</h1>
          <p className="text-gray-600">Excel-like interface for unit management</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedBuilding || ''}
            onChange={(e) => setSelectedBuilding(Number(e.target.value) || null)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Building</option>
            {buildings.map((building: any) => (
              <option key={building.id} value={building.id}>
                {building.name}
              </option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="Available">Available</option>
            <option value="Locked">Locked</option>
            <option value="Reserved">Reserved</option>
            <option value="Sold">Sold</option>
          </select>
        </div>
      </div>

      {!selectedBuilding ? (
        <div className="text-center py-12">
          <Building2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Select a building</h3>
          <p className="mt-1 text-sm text-gray-500">
            Choose a building to view its units in grid format.
          </p>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Area
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Floor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((unit: any) => (
                  <tr key={unit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {unit.unitNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(unit.status)}`}>
                        {unit.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${unit.price?.toLocaleString() || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {unit.area}m²
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {unit.floor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleLockUnit(unit.id)}
                          disabled={unit.status === 'Locked'}
                          className="text-yellow-600 hover:text-yellow-900 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Lock Unit"
                        >
                          <Lock className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => unit.lockId && handleUnlockUnit(unit.lockId)}
                          disabled={unit.status !== 'Locked'}
                          className="text-green-600 hover:text-green-900 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Unlock Unit"
                        >
                          <Unlock className="h-4 w-4" />
                        </button>
                        <button
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedBuilding && filteredData.length === 0 && (
        <div className="text-center py-12">
          <Grid3X3 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No units found</h3>
          <p className="mt-1 text-sm text-gray-500">
            No units match the current filter criteria.
          </p>
        </div>
      )}
    </div>
  );
}
