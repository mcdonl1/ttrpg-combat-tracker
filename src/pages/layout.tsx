import React, { useState } from "react";
import "tailwindcss/tailwind.css";

function Layout() {
  const [leftPaneExpanded, setLeftPaneExpanded] = useState(true);
  const [rightPaneExpanded, setRightPaneExpanded] = useState(true);

  const toggleLeftPane = () => {
    setLeftPaneExpanded(!leftPaneExpanded);
  };

  const toggleRightPane = () => {
    setRightPaneExpanded(!rightPaneExpanded);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">RollInitative</h1>
        <div className="flex items-center">
          <button
            className="mr-2 text-gray-400 hover:text-white focus:outline-none"
            onClick={toggleLeftPane}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-6 w-6 fill-current"
            >
              {leftPaneExpanded ? (
                <path d="M20 12H4a2 2 0 0 1 0-4h16a2 2 0 0 1 0 4z" />
              ) : (
                <path d="M4 6h16a2 2 0 0 1 0 4H4a2 2 0 0 1 0-4z" />
              )}
            </svg>
          </button>
          <button
            className="text-gray-400 hover:text-white focus:outline-none"
            onClick={toggleRightPane}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-6 w-6 fill-current"
            >
              {rightPaneExpanded ? (
                <path d="M4 12h16a2 2 0 0 1 0 4H4a2 2 0 0 1 0-4z" />
              ) : null}
            </svg>
          </button>
        </div>
      </header>
      <main className="flex-1 flex">
        {leftPaneExpanded && (
          <aside className="bg-gray-200 w-1/5 flex-shrink-0">
            <nav>
              <ul className="py-4">
                <li className="px-6 py-2">Icon 1</li>
                <li className="px-6 py-2">Icon 2</li>
                <li className="px-6 py-2">Icon 3</li>
              </ul>
            </nav>
          </aside>
        )}
        <div className="flex-1 px-6 py-4">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Class</th>
                <th className="px-4 py-2">Level</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">John Smith</td>
                <td className="border px-4 py-2">Ranger</td>
            <td className="border px-4 py-2">5</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Jane Doe</td>
            <td className="border px-4 py-2">Wizard</td>
            <td className="border px-4 py-2">3</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Bob Johnson</td>
            <td className="border px-4 py-2">Fighter</td>
            <td className="border px-4 py-2">7</td>
          </tr>
        </tbody>
      </table>
    </div>
    {rightPaneExpanded && (
      <aside className="bg-gray-200 w-1/5 flex-shrink-0"></aside>
    )}
  </main>
</div>
);
}

export default Layout;