import React, { useState, useEffect } from "react";
import axios from "axios";
import { LightOceanTheme } from "./themes"; // Ensure you have this import path correct

const KnowledgeBase = () => {
  const theme = LightOceanTheme;

  const [faqs, setFaqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/faqs")
      .then((response) => {
        const sortedFaqs = response.data.sort(
          (a, b) =>
            a.Category.localeCompare(b.Category) ||
            a.Sub_Category.localeCompare(b.Sub_Category)
        );
        setFaqs(sortedFaqs);
      })
      .catch((error) => {
        console.error("Error fetching FAQs:", error);
      });
  }, []);

  // Filter FAQs based on the search term
  const filteredFaqs = faqs.filter((faq) =>
    faq.Question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group FAQs by Category for display
  const groupedFaqs = {};
  filteredFaqs.forEach((faq) => {
    const category = faq.Category;
    if (!groupedFaqs[category]) {
      groupedFaqs[category] = [];
    }
    groupedFaqs[category].push(faq);
  });

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-8">
        <div className="max-w-[1640px] mx-auto bg-gray-200 bg-opacity-50 rounded-lg p-8 flex">
          <div className="w-1/3 pr-8">
            <img 
              src="https://img.freepik.com/free-vector/flat-people-asking-questions-illustration_23-2148901520.jpg?w=996&t=st=1703180818~exp=1703181418~hmac=25d978773da4d75d494eebaeb3a84d8d87badb403309206e1174101eb499ab39" 
              alt="People asking questions" 
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="flex-1">
            <h2 className={`text-${theme.colors.primary} font-extrabold text-4xl mb-8 border-b-4 border-${theme.colors.primary} pb-4`}>
              Frequently Asked Questions
            </h2>
            <input
              type="text"
              placeholder="Search FAQs..."
              className="w-full p-2 border rounded-md mb-6 focus:outline-none focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {Object.keys(groupedFaqs).length > 0 ? (
              Object.keys(groupedFaqs).map((category) => (
                <div key={category} className="mb-4">
                  <h3 className={`text-${theme.colors.primary} font-semibold text-2xl mb-2`}>
                    {category}
                  </h3>
                  {groupedFaqs[category].map((faq, index) => (
                    <div key={index} className="mb-2 bg-white p-4 rounded-md shadow-md">
                      <h5 className={`text-${theme.colors.text} font-semibold text-lg mb-2`}>
                        {faq.Question}
                      </h5>
                      <p className={`text-${theme.colors.text} mb-4`}>
                        {faq.Answer}
                      </p>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p className={`text-${theme.colors.text}`}>
                No FAQs found for your search.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
