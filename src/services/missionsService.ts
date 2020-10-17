import localDB from '../db.json'
import { getDistances } from "./geoService";
const ORIGIN_ADDRESS: string = "10 Downing st. London";

export interface Mission {
    agent: string,
    country: string,
    address: string,
    date: string,
    distanceFromOrigin?: number
}

interface Country {
    country: string,
    isolatedAgents:number
}

export const missions: Mission[] = localDB.missions
const countries: Country[] = []

// Chek if a given agent is isolated
export const isIsolated = (agentId: string) => {
    const agentMissions: Mission[] = missions.filter(mission => mission.agent === agentId)
    if (agentMissions.length === 1) return true
    else return false
}

const _setCountries = () => {
    missions.map(mission => {
        let idx = countries.findIndex(obj => obj.country === mission.country)
        if(idx === -1) countries.push({country: mission.country ,isolatedAgents: 0})
    })
    _setAgents()
}

const _setAgents = () => {
    missions.map(mission => {
        let countryIdx = countries.findIndex(obj => obj.country === mission.country)
        if(isIsolated(mission.agent)){
            countries[countryIdx].isolatedAgents += 1;
        }
    })
    countries.sort(function(a, b) {
        return b.isolatedAgents - a.isolatedAgents;
    });
}

export const getIsolatedCountry = () => {
    _setCountries()
    return countries[0].country
}

export const ascendingOrder = () => {
    missions.sort(function (a, b) {
        let keyA = new Date(a.date),
            keyB = new Date(b.date);

        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
}

export const closestFarthestFromOrigin = async (missionList: Mission[]) => {
    let currFarthest: Mission | null = null;
    let currClosest: Mission | null = null;
    let idx: number = 0;
    for (const mission of missionList) {
        let d = await getDistances(ORIGIN_ADDRESS, mission.address);
        mission.distanceFromOrigin = d;

        if (!idx) {
            currFarthest = mission;
            currClosest = mission;
        }
        if (
            d &&
            currFarthest?.distanceFromOrigin &&
            d > currFarthest.distanceFromOrigin
        ) {
            currFarthest = mission;
        }
        if (
            d &&
            currClosest?.distanceFromOrigin &&
            d < currClosest.distanceFromOrigin
        ) {
            currClosest = mission;
        }
        idx++;
    }
    return {closest: currClosest, farthest: currFarthest}
};
