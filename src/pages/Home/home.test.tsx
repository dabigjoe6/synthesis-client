import Home from './home';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import * as React from 'react';
import { UserContext } from '../../contexts/User';
import { FrequencyContext, FrequencyProvider } from '../../contexts/Frequency';
import moment from 'moment-timezone';
import MockDate from 'mockdate'
import { Enums } from '../../enums';

jest.mock("../../components/footer", () => () => {return <div>Mock Footer Component</div>})

const mockUserContext = {
  subscriptions: [],
  isDataLoading: true,
  user: {
    email: "mockUser", 
    _id: "mockUsedId", 
    settings: {
      isDigestPaused: false,
      isSummaryEnabled: false,
      frequency: {
        frequencyType: "weekly",
        time: ["2021-01-01T00:00:00.000Z"],
        timeZone: "UTC",
      }
    }
  },
  setSubscriptions: jest.fn(),
  unsubscribeFromAuthor: jest.fn(),
  subscribeToAuthor: jest.fn()
}

const mockFrequencyContext = {
  isNewChange: false,
  times: [],
  frequencyType: 'daily',
  selectedDays: { 'Mo': 'mon' },
  setFrequencyType: jest.fn(),
  handleDays: jest.fn(),
  addTime: jest.fn(),
  removeTime: jest.fn(),
  updateTime: jest.fn(),
  resetChange: jest.fn(),
  setIsNewChange: jest.fn()
}

describe('Home page tests', () => {

  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    });
  });
  
  test('Home - should show "Loading..." while awaiting data', async () => {
    render( 
      <UserContext.Provider value={mockUserContext}>
        <Home />
      </UserContext.Provider> 
      );
    expect(screen.getByText(Enums.LOADING)).toBeInTheDocument();
  });

  test('Home - user with no subscriptions', async () => {
    const mockUserContextUpdated = {...mockUserContext, isDataLoading: false}
    render( 
      <UserContext.Provider value={mockUserContextUpdated}>
        <Home />
      </UserContext.Provider> 
      );
    expect(screen.getByText(Enums.NO_SUBS_MESSAGE)).toBeInTheDocument();
    expect(screen.getByText(Enums.ADD_SUBS_MESSAGE)).toBeInTheDocument();
    expect(screen.getByText("Mock Footer Component")).toBeInTheDocument();
  });

  test('Home - user with subscriptions', async () => {
    MockDate.set(new Date('1/01/2023'));
    const mockUserContextUpdated = {
      ...mockUserContext, 
      isDataLoading: false, 
      subscriptions: [{
        subscription: {
          name: "mockSubscriptionName",
          url: "mockSubscriptionUrl",
          _id: "mockSubscriptionId",
          source: "mockSubscriptionSource"
          }
        }]
      }
    render( 
      <UserContext.Provider value={mockUserContextUpdated}>
        <FrequencyContext.Provider value={mockFrequencyContext} >
          <Home />
        </FrequencyContext.Provider>
      </UserContext.Provider> 
      );
      expect(screen.getByText(Enums.SUBS_LIST_TITLE)).toBeInTheDocument();
      expect(screen.getByText(/daily/)).toBeInTheDocument();
      expect(screen.getByText(/08:00/)).toBeInTheDocument();
      expect(screen.getByText(/mockSubscriptionName/)).toBeInTheDocument();
      expect(screen.getByText(/unsubscribe/)).toBeInTheDocument();
      expect(screen.getByText(Enums.ADD_NEW_SUBS_MESSAGE)).toBeInTheDocument();
      expect(screen.getByText(/mockSubscriptionUrl/)).toBeInTheDocument();
      expect(screen.getByRole("button", {name: "Settings"})).toBeInTheDocument();
      expect(screen.getByText("Mock Footer Component")).toBeInTheDocument();
      MockDate.reset();
  });

  test('Home - user with subscriptions can open settings & interact with features', async () => {
    MockDate.set(new Date('1/01/2023'));
    const mockUserContextUpdated = {
      ...mockUserContext, 
      isDataLoading: false, 
      subscriptions: [{
        subscription: {
          name: "mockSubscriptionName",
          url: "mockSubscriptionUrl",
          _id: "mockSubscriptionId",
          source: "mockSubscriptionSource"
          }
        }]
      }
    render( 
      <UserContext.Provider value={mockUserContextUpdated}>
        <FrequencyContext.Provider value={mockFrequencyContext} >
          <Home />
        </FrequencyContext.Provider>
      </UserContext.Provider> 
      );
      const settingsBtn = screen.getByRole("button", {name: "Settings"});
      fireEvent.click(settingsBtn);
      expect(screen.getByText(/Change Settings/)).toBeInTheDocument();
      expect(screen.getByText("Summaries of digest (On)")).toBeInTheDocument();
      const toggleSummaryBtn = screen.getByTestId("toggle-summary-btn");
      fireEvent.click(toggleSummaryBtn);
      expect(screen.getByText("Summaries of digest (Off)")).toBeInTheDocument();
      const pauseDigestBtn = screen.getByText("Pause digest");
      expect(pauseDigestBtn).toBeInTheDocument();
      fireEvent.click(pauseDigestBtn);
      // expect(screen.getByText("Your digest is paused, start receiving it again")).toBeInTheDocument();
      // const resumeDigestBtn = screen.getByText("Resume digest");
      // expect(resumeDigestBtn).toBeInTheDocument();
      // fireEvent.click(resumeDigestBtn);
      // expect(pauseDigestBtn).toBeInTheDocument();
      // const closeSettingsBtn = screen.getByText("Close");
      // expect(closeSettingsBtn).toBeInTheDocument();
      // fireEvent.click(closeSettingsBtn);
      // expect(screen.getByText(/Change Settings/)).not.toBeInTheDocument();
      // MockDate.reset();
  });

  test('Home - user can interact with frequency features', async () => {
    MockDate.set(new Date('1/01/2023'));
    const mockUserContextUpdated = {
      ...mockUserContext, 
      isDataLoading: false, 
      subscriptions: [{
        subscription: {
          name: "mockSubscriptionName",
          url: "mockSubscriptionUrl",
          _id: "mockSubscriptionId",
          source: "mockSubscriptionSource"
          }
        }]
      }
    render( 
      <UserContext.Provider value={mockUserContextUpdated}>
        <FrequencyContext.Provider value={mockFrequencyContext} >
          <Home />
        </FrequencyContext.Provider>
      </UserContext.Provider> 
      );
      const dailyOption = screen.getByTestId("subs-daily-option");
      expect(dailyOption).toBeInTheDocument();
      fireEvent.click(dailyOption);
      expect(screen.getByTestId("subs-daily-option")).toBeInTheDocument();
      expect(screen.getByTestId("subs-weekly-option")).toBeInTheDocument();
      const timeOption = screen.getByText("08:00");
      expect(timeOption).toBeInTheDocument()
      fireEvent.click(timeOption);
      expect(screen.getByText("8:00 am")).toBeInTheDocument();
      expect(screen.getByText("9:00 am")).toBeInTheDocument();
      const addTimeBtn = screen.getByTestId("add-time-btn");
      expect(addTimeBtn).toBeInTheDocument();
      fireEvent.click(addTimeBtn);
      fireEvent.click(addTimeBtn);
      const removeTimeBtn = screen.getByTestId("remove-time-btn");
      expect(removeTimeBtn).toBeInTheDocument();
      expect(addTimeBtn).not.toBeInTheDocument();
      expect(screen.getByText("08:00")).toBeInTheDocument();
      expect(screen.getByText("08:00")).toBeInTheDocument();
      fireEvent.click(removeTimeBtn);
      expect(screen.getByTestId("add-time-btn")).toBeInTheDocument();
      fireEvent.click(removeTimeBtn);
      expect(removeTimeBtn).not.toBeInTheDocument();
      MockDate.reset();
  });

});