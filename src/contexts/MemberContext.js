import { useState, useEffect } from "react";
import { createContext } from "react";
import { getFamilyMembers } from "services/api/api.js";

/* Provide members list to all components so that API only gets called once*/
export const MemberContext = createContext([]);

export const MemberProvider = ({ children }) => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMembers = async () => {
        try {
            const members = await getFamilyMembers();
            setMembers(members);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching family members:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    return (
        <MemberContext.Provider value={{ members, fetchMembers }}>
            {children}
        </MemberContext.Provider>
    );
};