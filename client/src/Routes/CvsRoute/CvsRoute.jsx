import React, { useState, useEffect } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProjectRoute from './ProjectRoute/ProjectRoute';
import useAuth from '../../Hooks/useAuth';
import axios from "../../Api/axios";

export function Project({ projects }) {
  const navigate = useNavigate();
  console.log(projects);
  return (
    <>
      <section className=' flex flex-col gap-2 justify-center h-auto m-4 px-3 py-2 rounded-md bg-white w-fit mx-auto'>
        {
          projects.map((project, index) => (
            <div
              key={index}
              className=' cursor-pointer relative bg-yellow-300 h-52 w-[39rem] rounded-md p-2'
              onClick={() => navigate(`/office/${project._id}/`, {
                state: {project: project},
              })}
            >
              {project.projectname}
              <span className=' absolute bottom-0 right-2'>{project.teamleader}</span>
            </div>
          ))
        }
      </section>
      <button title='Create Invitaion for New project' className=' absolute bottom-10 right-10 py-3 px-4 bg-white text-black font-bold text-xl rounded-[50%]' onClick={() => navigate("/projectInvitaion")} > + </button>
    </>
  );
}

export default function CvsRoute() {

  const [projects, setProjects] = useState([])

  const { auth } = useAuth();
  const { user } = auth;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const payload = { email: user.email };
        const response = await axios.get("/projects", {
          params: payload,
          headers: {
            "Content-Type": "application/json",
          },
        });
        // console.log(response.data);
        setProjects(response.data.projects);
 
      } catch (error) {
        console.log(error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='' element={<Project projects={projects} />} />
        <Route path='/:id/*' element={<ProjectRoute />} />
      </Routes>
    </>
  );
}
