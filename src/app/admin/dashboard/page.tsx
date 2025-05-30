"use client";

import { useGetAllArticles } from "@/features/article/useGetAllArticles";
import { useGetAllCategories } from "@/features/category/useGetAllCategories";
import {
  Newspaper,
  Tag,
  Users,
} from "lucide-react";
import Link from "next/link";

const DashboardPage = () => {
  const { data: categoryResponse } = useGetAllCategories({});
  const { data: articleResponse } = useGetAllArticles({});

  const stats = [
    {
      title: "Total Articles",
      value: articleResponse?.total || 0,
      icon: <Newspaper className="text-blue-500" size={28} />,
      url: "/admin/articles",
    },
    {
      title: "Categories",
      value: categoryResponse?.categories.length || 0,
      icon: <Tag className="text-green-500" size={28} />,
      url: "/admin/categories",
    },
    {
      title: "Active Users",
      value: 58,
      icon: <Users className="text-purple-500" size={28} />,
      url: "",
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <Link
            href={item.url}
            key={item.title}
            className="bg-white shadow rounded-2xl p-5 flex items-center gap-4"
          >
            <div className="bg-gray-100 p-3 rounded-xl">{item.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <p className="text-xl font-semibold">{item.value}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default DashboardPage;
