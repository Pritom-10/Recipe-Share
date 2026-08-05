// "use client";

// import { Crown, Heart, BookOpen, ThumbsUp, TrendingUp } from "lucide-react";

// export default function CustomerOverview() {

// //   const stats = {
// //     totalRecipes: 42,
// //     totalFavorites: 138,
// //     totalLikes: 894,
// //     isPremium: true,
// //   };

// //   const cards = [
// //     {
// //       title: "Total Recipes",
// //       value: stats.totalRecipes,
// //       icon: BookOpen,
// //       color: "from-violet-500 to-indigo-600",
// //       bg: "bg-violet-50",
// //       text: "text-violet-600",
// //     },
// //     {
// //       title: "Total Favorites",
// //       value: stats.totalFavorites,
// //       icon: Heart,
// //       color: "from-pink-500 to-rose-500",
// //       bg: "bg-pink-50",
// //       text: "text-pink-600",
// //     },
// //     {
// //       title: "Likes Received",
// //       value: stats.totalLikes,
// //       icon: ThumbsUp,
// //       color: "from-amber-500 to-orange-500",
// //       bg: "bg-orange-50",
// //       text: "text-orange-600",
// //     },
// //   ];

// //   return (
// //     <section className="space-y-8">
// //       {/* Header */}
// //       <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-indigo-600 via-violet-600 to-purple-700 p-8 text-white shadow-xl">
// //         <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-white/10 blur-3xl"></div>

// //         <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
// //           <div>
// //             <p className="text-sm uppercase tracking-[5px] text-indigo-100">
// //               Dashboard
// //             </p>

// //             <h1 className="mt-3 text-4xl font-bold">Welcome Back 👋</h1>

// //             <p className="mt-2 max-w-xl text-indigo-100">
// //               Track your recipes, favorites and community engagement from one
// //               beautiful dashboard.
// //             </p>
// //           </div>

// //           {stats.isPremium ? (
// //             <div className="flex items-center gap-3 rounded-2xl border border-yellow-300/40 bg-yellow-400/20 px-6 py-4 backdrop-blur-lg">
// //               <Crown className="h-10 w-10 text-yellow-300" />
// //               <div>
// //                 <p className="font-semibold text-yellow-200">Premium Member</p>
// //                 <p className="text-sm text-yellow-100">
// //                   Exclusive Features Enabled
// //                 </p>
// //               </div>
// //             </div>
// //           ) : (
// //             <div className="rounded-2xl bg-white/10 px-6 py-4 backdrop-blur-lg">
// //               <p className="font-semibold">Free Plan</p>
// //               <p className="text-sm text-indigo-100">
// //                 Upgrade to unlock premium features.
// //               </p>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Stats */}
// //       <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
// //         {cards.map((card) => {
// //           const Icon = card.icon;

// //           return (
// //             <div
// //               key={card.title}
// //               className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
// //             >
// //               <div
// //                 className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${card.color}`}
// //               />

// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <p className="text-gray-500">{card.title}</p>

// //                   <h2 className="mt-3 text-4xl font-bold text-gray-900">
// //                     {card.value}
// //                   </h2>

// //                   <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600">
// //                     <TrendingUp size={16} />
// //                     <span>Growing steadily</span>
// //                   </div>
// //                 </div>

// //                 <div
// //                   className={`${card.bg} rounded-2xl p-5 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}
// //                 >
// //                   <Icon className={`h-9 w-9 ${card.text}`} />
// //                 </div>
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>

// //       {/* Premium Feature */}
// //       <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
// //         <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
// //           <div>
// //             <h2 className="text-2xl font-bold text-gray-900">
// //               Membership Status
// //             </h2>

// //             <p className="mt-2 text-gray-500">
// //               Your payment determines access to premium recipe features and
// //               exclusive content.
// //             </p>
// //           </div>

// //           {stats.isPremium ? (
// //             <span className="rounded-full bg-linear-to-r from-yellow-400 to-orange-500 px-6 py-3 font-semibold text-white shadow-lg">
// //               ⭐ Premium Active
// //             </span>
// //           ) : (
// //             <button className="rounded-full bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-3 font-semibold text-white transition hover:scale-105">
// //               Upgrade Now
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //     </section>
//   //   );
  
//   <div>
//     overview
//   </div>
// }



const CustomerOverview = () => {
  return (
    <div>
      Cstomer Overview
    </div>
  );
};

export default CustomerOverview;