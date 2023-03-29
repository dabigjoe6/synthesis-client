import * as React from 'react';
import { toast } from 'react-toastify';
import { StatusCallback } from '../types';
import { AuthContext } from './Auth';

const BASE_URL = process.env.REACT_APP_BASE_URL;


export enum WeekDays {
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
};

export enum FrequencyType {
  "daily",
  "weekly",
}

export interface FrequencyI {
  frequencyType: string;
  days?: Array<WeekDays>;
  time: Array<string>;
}

export interface SettingsI {
  isDigestPaused: boolean,
  isSummaryEnabled: boolean,
  frequency: FrequencyI
}


export interface SettingsContextI {
  pauseDigest: (cb: StatusCallback) => void;
  resumeDigest: (cb: StatusCallback) => void;
  enableSummary: (cb: StatusCallback) => void;
  disableSummary: (cb: StatusCallback) => void;
  saveNewFrequency: (_frequencyType: string, _times: Array<string>, _selectedDays: { [key: string]: string }, cb: StatusCallback) => void;
}

export const SettingsContext = React.createContext<SettingsContextI>({
  pauseDigest: () => { },
  resumeDigest: () => { },
  enableSummary: () => { },
  disableSummary: () => { },
  saveNewFrequency: () => { },
});

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, token, signUserOut, updateUserSettings } = React.useContext(AuthContext);

  const pauseDigest = async (cb: StatusCallback) => {
    try {
      if (user && user._id) {
        const response = await fetch(BASE_URL + "/user/pause-digest", {
          method: "POST",
          body: JSON.stringify({ userId: user?._id }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 404) throw new Error("Not found", data.message);
          else if (response.status === 401) {
            signUserOut();
            throw new Error("Session expired, please sign in", data.message);
          } else throw new Error(data.message);
        }
        updateUserSettings({
          ...user,
          settings: {
            ...user.settings,
            isDigestPaused: true
          }
        })
        cb(true);
      } else {
        throw new Error("User Id required");
      }
    } catch (err) {
      toast.error(err.message || err);
      cb(false);
      console.error("Could not unsubscribe: ", err);
    }
  }

  const resumeDigest = async (cb: StatusCallback) => {
    try {
      if (user && user._id) {
        const response = await fetch(BASE_URL + "/user/resume-digest", {
          method: "POST",
          body: JSON.stringify({ userId: user?._id }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 404) throw new Error("Not found", data.message);
          else if (response.status === 401) {
            signUserOut();
            throw new Error("Session expired, please sign in", data.message);
          } else throw new Error(data.message);
        }
        updateUserSettings({
          ...user,
          settings: {
            ...user.settings,
            isDigestPaused: false
          }
        })
        cb(true);
      } else {
        throw new Error("User Id required");
      }
    } catch (err) {
      toast.error(err.message || err);
      cb(false);
      console.error("Could not unsubscribe: ", err);
    }
  }

  const saveNewFrequency = async (_frequencyType: string, _times: Array<string>, _selectedDays: { [key: string]: string }, cb: StatusCallback) => {
    try {
      if (user && user._id) {
        const response = await fetch(BASE_URL + "/user/set-frequency", {
          method: "POST",
          body: JSON.stringify({ frequencyType: _frequencyType, time: _times, days: Object.values(_selectedDays) }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 404) throw new Error("Not found", data.message);
          else if (response.status === 401) {
            signUserOut();
            throw new Error("Session expired, please sign in", data.message);
          } else throw new Error(data.message);
        }
        updateUserSettings({
          ...user,
          settings: {
            ...user.settings,
            frequency: {
              frequencyType: _frequencyType,
              time: _times,
              days: (Object.values(_selectedDays) as unknown) as WeekDays[]
            }
          }
        })
        toast.success("New frequency saved");
        cb(true)
      } else {
        cb(false)
        throw new Error("User Id required");
      }
    } catch (err) {
      toast.error(err.message || err);
      cb(false)
      toast.error("Could not update frequency");
      console.error("Could not unsubscribe: ", err);
    }
  }

  const enableSummary = async (cb: StatusCallback) => {
    try {
      if (user && user._id) {
        const response = await fetch(BASE_URL + "/user/enable-summary", {
          method: "POST",
          body: JSON.stringify({ userId: user?._id }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 404) throw new Error("Not found", data.message);
          else if (response.status === 401) {
            signUserOut();
            throw new Error("Session expired, please sign in", data.message);
          } else throw new Error(data.message);
        }
        updateUserSettings({
          ...user,
          settings: {
            ...user.settings,
            isSummaryEnabled: true
          }
        })
        cb(true);
      } else {
        throw new Error("User Id required");
      }
    } catch (err) {
      toast.error(err.message || err);
      cb(false);
      console.error("Could not unsubscribe: ", err);
    }
  }

  const disableSummary = async (cb: StatusCallback) => {
    try {
      if (user && user._id) {
        const response = await fetch(BASE_URL + "/user/disable-summary", {
          method: "POST",
          body: JSON.stringify({ userId: user?._id }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 404) throw new Error("Not found", data.message);
          else if (response.status === 401) {
            signUserOut();
            throw new Error("Session expired, please sign in", data.message);
          } else throw new Error(data.message);
        }
        updateUserSettings({
          ...user,
          settings: {
            ...user.settings,
            isSummaryEnabled: false
          }
        })
        cb(true);
      } else {
        throw new Error("User Id required");
      }
    } catch (err) {
      toast.error(err.message || err);
      cb(false);
      console.error("Could not unsubscribe: ", err);
    }
  }

  return (
    <SettingsContext.Provider
      value={{
        enableSummary,
        disableSummary,
        saveNewFrequency,
        pauseDigest,
        resumeDigest
      }}>
      {children}
    </SettingsContext.Provider>
  )
}