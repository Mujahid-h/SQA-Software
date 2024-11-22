import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBugs } from "../api/bugApi";
import DefaultLayout from "../components/DefaultLayout";
import BugsTable from "../components/BugsTable";
import FilterBar from "../components/FilterBar";

const HomePage = () => {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [bugs, setBugs] = useState([]);
  const [filters, setFilters] = useState({
    bugId: "",
    createdBy: "",
    status: "",
    priority: "",
    date: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchBugs(token);
    }
  }, [token]);

  const fetchBugs = async (token) => {
    try {
      const response = await getBugs(token);
      setBugs(response);
    } catch (error) {
      console.log("Error while fetching bugs: ", error);
    }
  };

  const filteredBugs = bugs.filter((bug) => {
    return (
      (filters.bugId ? bug._id.includes(filters.bugId) : true) &&
      (filters.createdBy
        ? bug.createdBy.name
            ?.toLowerCase()
            .includes(filters.createdBy.toLowerCase())
        : true) &&
      (filters.status ? bug.status === filters.status : true) &&
      (filters.priority ? bug.priority === filters.priority : true) &&
      (filters.date
        ? new Date(bug.createdAt).toLocaleDateString() ===
          new Date(filters.date).toLocaleDateString()
        : true)
    );
  });

  return (
    <DefaultLayout>
      <FilterBar filters={filters} setFilters={setFilters} />
      <BugsTable bugs={filteredBugs} />
    </DefaultLayout>
  );
};

export default HomePage;
