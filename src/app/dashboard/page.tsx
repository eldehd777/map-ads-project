import { Clock, CheckCircle2, AlertCircle, PlayCircle } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex-1 bg-slate-50 min-h-[calc(100vh-4rem)] p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">내 진행 상황 (Kanban)</h1>
          <p className="text-slate-500">협찬 제안부터 정산까지의 과정을 한눈에 확인하세요.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto pb-4">
          
          {/* Column 1: 제안 대기중 */}
          <div className="flex-1 min-w-[300px] bg-slate-100/50 border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-4 px-1">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              <h2 className="font-semibold text-slate-700">제안 검토중 (1)</h2>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:border-blue-300 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">신규 제안</span>
                <span className="text-xs text-slate-400">1시간 전</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-1">프리미엄 헤어살롱 커트+펌</h3>
              <p className="text-sm text-slate-500 mb-3">헤어살롱 더스타일 (도보 10분)</p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                <span className="text-xs font-medium text-slate-500">예상 리워드</span>
                <span className="text-sm font-bold text-slate-900">시술 + 5만원</span>
              </div>
            </div>
          </div>

          {/* Column 2: 콘텐츠 제작중 */}
          <div className="flex-1 min-w-[300px] bg-slate-100/50 border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-4 px-1">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <h2 className="font-semibold text-slate-700">콘텐츠 제작중 (1)</h2>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:border-blue-300 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded-md flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  D-3 마감
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mb-1">신메뉴 흑임자 라떼 릴스</h3>
              <p className="text-sm text-slate-500 mb-3">카페 베를린</p>
              <button className="w-full mt-2 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                URL 제출하기
              </button>
            </div>
          </div>

          {/* Column 3: 정산 대기/완료 */}
          <div className="flex-1 min-w-[300px] bg-slate-100/50 border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-4 px-1">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <h2 className="font-semibold text-slate-700">에스크로 정산 대기 (0)</h2>
            </div>
            
            <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-slate-200 rounded-xl text-slate-400">
              <CheckCircle2 className="w-6 h-6 mb-2 text-slate-300" />
              <p className="text-sm">현재 정산 대기중인 건이 없습니다.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
