import React, {useEffect, useState, useContext} from 'react';
import MySelect from "../UI/Select/MySelect";
import {current_year, years} from "../../consts";
import axios from "axios";
import {AppContext} from "../AppContext";

const Seleclor = ({setSearchParams}) => {

    const [events, setEvents] = useState([]);
    const [teams, setTeams] = useState([]);
    const [people, setPeople] = useState([]);

    const {data, setData} = useContext(AppContext);
    const [year, setYear] = useState("");
    const [event, setEvent] = useState("");
    const [person, setPerson] = useState("");
    const [team, setTeam] = useState("");


    function updData() {
        setYear(data.year === undefined ? "" : data.year);
        setEvent(data.event === undefined ? "" : data.event);
        setTeam(data.team === undefined ? "" : data.team);
        setPerson(data.person === undefined ? "" : data.person);
    }


    useEffect(() => {
        updData();
        if (data.year !== undefined) {
            getMenu()
        }
    }, [data.year]);

    useEffect(() => {
        updData();
    }, [data])

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    function parseOptions(a) {
        return a.split(',').filter(x => x.length > 0).filter(onlyUnique);
    }

    function getOptionObj(a) {
        return a.map(x => {return {label: x}});
    }

    async function getMenu() {
        const response = await axios.get(`/${data.year}.html`);
        const menu = response.data;
        const split = menu.split("\n", 3);
        let obj = data;
        if (data.event === undefined && data.team === undefined && data.person === undefined) {
            obj["event"] = "Photo Tour";
        }
        delete obj.text;
        setData(obj);
        setEvents(parseOptions(split[0]));
        setTeams(parseOptions(split[1]));
        setPeople(parseOptions(split[2]));
    }


    return (
        <div className="selector-wrapper">
            <MySelect options={getOptionObj(years)} onChange={selectedYear => {
                let obj = data;
                obj["year"] = selectedYear.label;
                if (data.event !== undefined) {
                    setSearchParams({
                        album: selectedYear.label,
                        event: data.event
                    });
                } else if (data.team !== undefined) {
                    setSearchParams({
                        album: selectedYear.label,
                        team: data.team
                    });
                } else if (data.person !== undefined) {
                    setSearchParams({
                        album: selectedYear.label,
                        person: data.person
                    });
                } else {
                    setSearchParams({
                        album: selectedYear.label,
                        event: "Photo Tour"
                    });
                    obj["event"] = "Photo Tour";
                    delete obj.text;
                }
                setData(obj);
                updData();
            }} name={"Select year"} value={year}/>
            {data.year && <MySelect options={getOptionObj(events)} onChange={selectedEvent => {
                setData({
                    "year": data.year,
                    "event": selectedEvent.label
                })

                setSearchParams({
                    album: data.year,
                    event: selectedEvent.label
                });
                updData();
            }} name={"Select event"} value={event}/>}
            {data.year && <MySelect options={getOptionObj(teams)} onChange={selectedTeam => {
                setData({
                    "year": data.year,
                    "team": selectedTeam.label
                })
                setSearchParams({
                    album: data.year,
                    team: selectedTeam.label
                });
                updData();
            }} name={"Select team"} value={team}/>}
            {data.year && <MySelect options={getOptionObj(people)} onChange={selectedPerson => {
                setData({
                    "year": data.year,
                    "person": selectedPerson.label
                })
                setSearchParams({
                    album: data.year,
                    person: selectedPerson.label
                });
                updData();
            }} name={"Select person"} value={person}/>}
        </div>
    );
};

export default Seleclor;