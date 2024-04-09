// Import necessary modules and components
import React, { useContext, useState } from "react";
import * as S from "./styles"; // Import styled components
import Logo from "../../Img/Logo.png"; // Import logo image
import TaskFill from "../../Img/taskFill.png"; // Import task fill image
import Settings from "../../Img/settings.svg"; // Import settings image
import Folder from "../../Img/folder.svg"; // Import folder image
import Logout from "../../Img/logout.svg"; // Import logout image
import SidebarItem from "../../Components/SidebarItem"; // Import SidebarItem component
import ExpandSidebarItem from "../../Components/ExpandSidebarItem"; // Import ExpandSidebarItem component
import TaskCard from "../../Components/TaskCard"; // Import TaskCard component
import AddTask from "../../Components/AddTask"; // Import AddTask component
import { TaskListContext } from "../../Contexts/taskListContext"; // Import TaskListContext
import { TaskListType } from "../../Contexts/taskType"; // Import TaskListType
import FilterTag from "../../Components/FilterTag"; // Import FilterTag component
import Filter from "../../Img/filter.svg"; // Import filter image
import { DeleteContext } from "../../Contexts/deleteContext"; // Import DeleteContext
import { DeleteType } from "../../Contexts/deleteType"; // Import DeleteType
import DeleteModal from "../../Components/DeleteModal"; // Import DeleteModal component
import AddModal from "../../Components/AddModal"; // Import AddModal component
import { AddContext } from "../../Contexts/addContext"; // Import AddContext
import { AddType } from "../../Contexts/addType"; // Import AddType
import { Link } from "react-router-dom"; // Import Link component for routing
import AuthContext, { AuthType } from "../../Contexts/authContext"; // Import AuthContext and AuthType

// Define Home component as a functional component
const Home: React.FC = () => {
    // Destructure necessary contexts and types
    const { taskList, doneTasks, notDoneTasks } = useContext(TaskListContext) as TaskListType;
    const { showDelete } = useContext(DeleteContext) as DeleteType;
    const { showAdd } = useContext(AddContext) as AddType;
    const { setUserData } = useContext(AuthContext) as AuthType;

    // State variables for managing task list display
    const [listToDisplay, setListToDisplay] = useState(0);
    const [allActive, setAllActive] = useState(true);
    const [doneActive, setDoneActive] = useState(false);
    const [notDoneActive, setNotDoneActive] = useState(false);

    // Array of lists for displaying different task lists
    const listOfLists = [taskList, doneTasks, notDoneTasks];

    // Function to handle display of all tasks
    function handleAll() {
        setListToDisplay(0);
        setAllActive(true);
        setDoneActive(false);
        setNotDoneActive(false);
    }

    // Function to handle display of done tasks
    function handleDone() {
        setListToDisplay(1);
        setAllActive(false);
        setDoneActive(true);
        setNotDoneActive(false);
    }

    // Function to handle display of not done tasks
    function handleNotDone() {
        setListToDisplay(2);
        setAllActive(false);
        setDoneActive(false);
        setNotDoneActive(true);
    }

    // Function to handle logout
    function handleLogout() {
        localStorage.removeItem('@Project:email');
        setUserData({ email: "" });
    }

    // Return JSX for Home component
    return (
        <S.Page>
            {/* Sidebar section */}
            <S.Sidebar>
                <S.Img src={Logo} />
                <S.Tabs>
                    {/* Sidebar items */}
                    <SidebarItem icon={TaskFill} name="Tasks" isActive={true}></SidebarItem>
                    <ExpandSidebarItem icon={Folder} name="Categories"></ExpandSidebarItem>
                    <SidebarItem icon={Settings} name="Settings" isActive={false}></SidebarItem>
                </S.Tabs>
                {/* Logout link */}
                <Link to="/login" style={{ textDecoration: 'none' }} onClick={handleLogout}>
                    <SidebarItem icon={Logout} name="Logout" isActive={false}></SidebarItem>
                </Link>
            </S.Sidebar>
            {/* Main section */}
            <S.Main>
                <S.Header>All your tasks</S.Header>
                {/* Title and filter section */}
                <S.TitleAndFilter>
                    <S.Title onClick={handleDone}>Tasks </S.Title>
                    <S.FilterField>
                        {/* Filter tags */}
                        <div onClick={handleAll}><FilterTag name="All" active={allActive} /></div>
                        <div onClick={handleDone}><FilterTag name="Done" active={doneActive} /></div>
                        <div onClick={handleNotDone}><FilterTag name="Not done" active={notDoneActive} /></div>
                        {/* Filter icon */}
                        <S.FilterIcon src={Filter} />
                    </S.FilterField>
                </S.TitleAndFilter>
                {/* Task cards */}
                {listOfLists[listToDisplay].map(task => <TaskCard id={task.id} name={task.title} list={task.categorie} color={task.color} done={task.done} />)}
                {/* Add task component */}
                <AddTask></AddTask>
            </S.Main>
            {/* Delete modal */}
            {showDelete && <DeleteModal />}
            {/* Add modal */}
            {showAdd && <AddModal />}
        </S.Page>
    );
};

// Export Home component as default
export default Home;
