import Home from './home';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import * as React from 'react';
import { UserContext } from '../../contexts/User';
import { FrequencyContext, FrequencyProvider } from '../../contexts/Frequency';
import * as moment from 'moment';

jest.mock("../../components/footer", () => () => {return <div>Mock Footer Component</div>})
jest.mock("../../components/frequency/index", () => () => {return <div>Mock Frequency Component</div>})
// jest.mock("../../contexts/Frequency/FrequencyProvider", () => () => {return <div>Mock FrequencyProvider Component</div>})

// jest.mock('moment', () => () => ({format: () => '2023–01–01T12:00:00+00:00'}));
jest.mock('moment', () => () => (jest.requireActual('moment-timezone')).tz('2021-01-01T00:00:00.000Z', 'GMT'));

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
        time: ["mockTime"],
        timeZone: "mockTimeZone",
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

  test('renders Home - should show "Loading..." while awaiting data', async () => {
    render( 
      <UserContext.Provider value={mockUserContext}>
        <Home />
      </UserContext.Provider> 
      );
    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });

  test('renders Home - user with no subscriptions', async () => {
    const mockUserContextUpdated = {...mockUserContext, isDataLoading: false}
    render( 
      <UserContext.Provider value={mockUserContextUpdated}>
        <Home />
      </UserContext.Provider> 
      );
    expect(screen.getByText(/You don't have any subscriptions/)).toBeInTheDocument();
    expect(screen.getByText(/Add Subscription now/)).toBeInTheDocument();
  });

  test('renders Home - user with subscriptions', async () => {
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
    expect(screen.getByText(/You don't have any subscriptions/)).toBeInTheDocument();
    expect(screen.getByText(/Add Subscription now/)).toBeInTheDocument();
  });

});