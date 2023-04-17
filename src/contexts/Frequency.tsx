import * as React from 'react';
import { dayMap } from '../config';
import { AuthContext } from './Auth';

interface FrequencyContextI {
  isNewChange: boolean;
  frequencyType: string;
  times: Array<string>;
  selectedDays: { [key: string]: string };
  setFrequencyType: React.Dispatch<React.SetStateAction<string>>;
  handleDays: (day: string) => void;
  addTime: () => void;
  removeTime: () => void;
  updateTime: (time: string, index: number) => void;
  resetChange: () => void;
  setIsNewChange: React.Dispatch<React.SetStateAction<boolean>>;
};


export const FrequencyContext = React.createContext<FrequencyContextI>({
  isNewChange: false,
  times: [],
  frequencyType: 'daily',
  selectedDays: { 'Mo': 'mon' },
  setFrequencyType: () => { },
  handleDays: () => { },
  addTime: () => { },
  removeTime: () => { },
  updateTime: () => { },
  resetChange: () => { },
  setIsNewChange: () => { }
});

const buildSelectedDays = (days: Array<string>) => {
  const selectedDaysMap: { [key: string]: string } = {};
  days.forEach(day => {
    if (day === "mon") {
      selectedDaysMap["Mo"] = day
    }
    if (day === "tue") {
      selectedDaysMap["Tu"] = day
    }
    if (day === "wed") {
      selectedDaysMap["We"] = day
    }
    if (day === "thu") {
      selectedDaysMap["Th"] = day
    }
    if (day === "fri") {
      selectedDaysMap["Fr"] = day
    }
    if (day === "sat") {
      selectedDaysMap["Sa"] = day
    }
    if (day === "sun") {
      selectedDaysMap["Su"] = day
    }
  })

  return selectedDaysMap;
}

export const FrequencyProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = React.useContext(AuthContext);

  const userFrequencyType = user?.settings?.frequency?.frequencyType || "daily";
  const userTimes = user?.settings?.frequency?.time || ["08:00"];
  const userSelectedDays = buildSelectedDays((user?.settings?.frequency?.days || ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]) as Array<string>);

  const [frequencyType, setFrequencyType] = React.useState<string>(userFrequencyType);
  const [times, setTimes] = React.useState<Array<string>>(userTimes);
  const [selectedDays, setSelectedDays] = React.useState<{ [key: string]: string }>(userSelectedDays);

  const [isNewChange, setIsNewChange] = React.useState<boolean>(false);

  const handleDays = (day: string): void => {
    if (day in selectedDays && Object.keys(selectedDays).length > 1) {
      const oldSelectedDays = selectedDays;
      delete oldSelectedDays[day];
      setSelectedDays({ ...oldSelectedDays });
    } else {
      const oldSelectedDays = selectedDays;
      oldSelectedDays[day] = dayMap[day];
      setSelectedDays({ ...oldSelectedDays });
    }
  }

  const addTime = (): void => {
    setTimes([...times, '08:00']);
  };

  const removeTime = (): void => {
    const newTimes = [...times];
    newTimes.pop();
    setTimes([...newTimes]);
  }

  const updateTime = (time: string, index: number): void => {
    const newTimes = [...times];
    newTimes[index] = time;
    setTimes([...newTimes]);
  }

  const resetChange = () => {
    setFrequencyType(userFrequencyType);
    setTimes(userTimes);
    setSelectedDays(userSelectedDays);
    setIsNewChange(false);
  };

  React.useEffect(() => {
    if (frequencyType !== userFrequencyType) {
      setIsNewChange(true);
    } else {
      if (times.length !== userTimes.length) {
        setIsNewChange(true);
      } else {
        times.forEach((time, index) => {
          if (time !== userTimes[index]) {
            setIsNewChange(true);
          }
        });
      }
      if (Object.keys(selectedDays).length !== Object.keys(userSelectedDays).length) {
        setIsNewChange(true);
      };

      Object.keys(selectedDays).forEach(day => {
        if (!(day in userSelectedDays)) {
          setIsNewChange(true)
        }
      })
    }
  }, [frequencyType, times, selectedDays]);



  return (
    <FrequencyContext.Provider value={{
      isNewChange,
      frequencyType,
      selectedDays,
      times,
      setFrequencyType,
      handleDays,
      addTime,
      removeTime,
      updateTime,
      resetChange,
      setIsNewChange
    }}>
      {children}
    </FrequencyContext.Provider>
  )
};

