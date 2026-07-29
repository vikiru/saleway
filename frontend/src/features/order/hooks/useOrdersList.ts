'use client';

import { useMemo, useState } from 'react';
import { useOrders } from '@/features/order/queries/order';

export function useOrdersList(userId: string) {
  const { data: orders, isLoading, error } = useOrders(userId);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredOrders = useMemo(() => {
    if (!orders) return [];
    return orders.filter(
      (order) =>
        order.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.status.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [orders, searchQuery]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return {
    orders: paginatedOrders,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    totalCount: filteredOrders.length,
  };
}
