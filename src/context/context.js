import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
// import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({children}) => {
    const [user, setUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);
    const [request, setRequest] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({show : false, msg : ""})

const fetchRequests = async() => {
   try {
        const resp = await fetch(`${rootUrl}/rate_limit`);
            const data = await resp.json();
            const {rate} = data;
            let {remaining} = rate;
            if(remaining === 0){
                setError({show : true, msg : 'Hourly limit Exceeded!'});
            }
            else{
                setRequest(remaining);
            }
        } catch (error) {
            console.log(error);
    }
}

useEffect(() => {
    fetchRequests()
},[])

// fetching user info from Github API; 
const fetchGithubUser = async (userName) => {
    setError({show : false, msg : ""})
    // user data 
    const resp = await fetch(`${rootUrl}/users/${userName}`);
    const data = await resp.json(); 
    const {login} = data
    
    if(login){
        // loading gif turned onn!
        setIsLoading(true);
        setUser(data);
       // Followers Info from GitHub API
        const resp = await fetch(`${rootUrl}/users/${userName}/followers?per_page=100`);
        const followersData = await resp.json();
        setFollowers(followersData);

        // Repos info from GitHub API
        const reposResponse = await fetch(`${rootUrl}/users/${userName}/repos?per_page=100`);
        const reposData = await reposResponse.json();
        setRepos(reposData);
        // laoding gif turned off
       setIsLoading(false);
    }else{
        setError({show : true, msg : "Account Not Found!"})
    }
    
    
}



    return <GithubContext.Provider value ={{user, followers, repos, request, error, fetchGithubUser, isLoading}}>
        {children}
    </GithubContext.Provider>
}

export {GithubContext, GithubProvider};


 // repos url
        // https://api.github.com/users/john-smilga/repos?per_page=100
