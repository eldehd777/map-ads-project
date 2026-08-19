"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Users, Ban, Trash2, CheckCircle } from "lucide-react";
import clsx from "clsx";

export default function AdminUsersPage() {
  const { users, suspendUser, activateUser, deleteUser } = useAuthStore();

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === "active").length;
  const suspendedUsers = users.filter(u => u.status === "suspended").length;

  return (
    <main className="min-h-screen bg-slate-50 pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
        <div className="flex flex-col gap-8">
          
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">가입 계정 관리</h1>
            <p className="text-slate-500">플랫폼에 가입된 모든 유저를 조회하고 관리합니다.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Users className="w-6 h-6" /></div>
              <div>
                <p className="text-sm font-medium text-slate-500">총 가입자</p>
                <p className="text-2xl font-bold text-slate-900">{totalUsers}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle className="w-6 h-6" /></div>
              <div>
                <p className="text-sm font-medium text-slate-500">활성 계정</p>
                <p className="text-2xl font-bold text-slate-900">{activeUsers}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-red-50 text-red-600 rounded-xl"><Ban className="w-6 h-6" /></div>
              <div>
                <p className="text-sm font-medium text-slate-500">정지된 계정</p>
                <p className="text-2xl font-bold text-slate-900">{suspendedUsers}</p>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-500">이름</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-500">이메일</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-500">권한</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-500">상태</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-500">가입일</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-500 text-right">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map(user => (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {user.avatar ? (
                            <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold">{user.name.charAt(0)}</div>
                          )}
                          <span className="font-bold text-slate-900">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={clsx(
                          "px-2.5 py-1 text-xs font-bold rounded-full",
                          user.role === "admin" ? "bg-red-100 text-red-700" :
                          user.role === "brand" ? "bg-indigo-100 text-indigo-700" :
                          "bg-blue-100 text-blue-700"
                        )}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={clsx(
                          "px-2.5 py-1 text-xs font-bold rounded-full",
                          user.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                        )}>
                          {user.status === "active" ? "활성" : "정지됨"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {user.status === "active" ? (
                            <button 
                              onClick={() => suspendUser(user.id)}
                              className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                              title="계정 정지"
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                          ) : (
                            <button 
                              onClick={() => activateUser(user.id)}
                              className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="정지 해제"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button 
                            onClick={() => {
                              if (confirm("정말로 이 계정을 삭제(강제 탈퇴)하시겠습니까?")) {
                                deleteUser(user.id);
                              }
                            }}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="강제 탈퇴"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
