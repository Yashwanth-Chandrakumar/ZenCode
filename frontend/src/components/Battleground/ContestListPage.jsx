// import React, { useState } from 'react';
// import ContestDetails from './ContestDetails';
// import ContestList from './ContestList';
// import Leaderboard from './Leaderboard';

// function ContestListPage() {
//   const [selectedContest, setSelectedContest] = useState(null);

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
//       <div className="w-64 bg-white dark:bg-gray-800 shadow-lg">
//         <ContestList onSelectContest={setSelectedContest} />
//       </div>
//       <div className="flex-1 overflow-y-auto">
//         <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//           {selectedContest && (
//             <>
//               <ContestDetails contest={selectedContest} />
//               <Leaderboard contestId={selectedContest.id} />
//             </>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default ContestListPage;