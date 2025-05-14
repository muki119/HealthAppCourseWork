import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../userContext/userContext';
import './Goals.css';

function Goals() {
  const { user } = useContext(UserContext);
  const [goals, setGoals] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('active');
  
  // Form state
  const [goalName, setGoalName] = useState('');
  const [goalType, setGoalType] = useState('calories');
  const [goalValue, setGoalValue] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isDaily, setIsDaily] = useState(false);

  useEffect(() => {
    if (user) {
      loadGoals();
    }
  }, [user]);

  const loadGoals = async () => {
    try {
      const response = await axios.get('/api/goals');
      setGoals(response.data);
    } catch (err) {
      setError('Could not load goals');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newGoal = {
        goal_name: goalName,
        goal_type: goalType,
        goal_value: goalValue,
        end_date: endDate,
        is_daily: isDaily
      };

      await axios.post('/api/goals', newGoal);
      setShowAddForm(false);
      loadGoals();
      resetForm();
    } catch (err) {
      setError('Failed to add goal');
    }
  };

  const handleDelete = async (goalId) => {
    try {
      await axios.delete(`/api/goals/${goalId}`);
      loadGoals();
    } catch (err) {
      setError('Failed to delete goal');
    }
  };

  const handleComplete = async (goalId) => {
    try {
      await axios.put(`/api/goals/${goalId}`, { completed: true });
      loadGoals();
    } catch (err) {
      setError('Failed to complete goal');
    }
  };

  const resetForm = () => {
    setGoalName('');
    setGoalType('calories');
    setGoalValue('');
    setEndDate('');
    setIsDaily(false);
  };

  const getGoalTypeLabel = (type) => {
    const types = {
      calories: 'Calories',
      water: 'Water Intake',
      exercise: 'Exercise',
      weight: 'Weight'
    };
    return types[type] || type;
  };

  const getGoalUnit = (type) => {
    const units = {
      calories: 'kcal',
      water: 'ml',
      exercise: 'minutes',
      weight: 'kg'
    };
    return units[type] || '';
  };

  const activeGoals = goals.filter(goal => !goal.completed);
  const completedGoals = goals.filter(goal => goal.completed);

  return (
    <div className="goals-page">
      <div className="goals-container">
        <h2>My Health Goals</h2>
        
        {error && <div className="error-message">{error}</div>}

        <div className="tabs">
          <button 
            className={activeTab === 'active' ? 'active' : ''} 
            onClick={() => setActiveTab('active')}
          >
            Active Goals
          </button>
          <button 
            className={activeTab === 'completed' ? 'active' : ''} 
            onClick={() => setActiveTab('completed')}
          >
            Completed Goals
          </button>
        </div>

        <button className="add-button" onClick={() => setShowAddForm(true)}>
          Add New Goal
        </button>

        {showAddForm && (
          <div className="add-goal-form">
            <h3>Add New Goal</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Goal Name:</label>
                <input
                  type="text"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Goal Type:</label>
                <select value={goalType} onChange={(e) => setGoalType(e.target.value)}>
                  <option value="calories">Calories</option>
                  <option value="water">Water Intake</option>
                  <option value="exercise">Exercise</option>
                  <option value="weight">Weight</option>
                </select>
              </div>

              <div className="form-group">
                <label>Target Value:</label>
                <input
                  type="number"
                  value={goalValue}
                  onChange={(e) => setGoalValue(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>End Date:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={isDaily}
                    onChange={(e) => setIsDaily(e.target.checked)}
                  />
                  Daily Goal
                </label>
              </div>

              <div className="form-buttons">
                <button type="submit">Save Goal</button>
                <button type="button" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="goals-list">
          {activeTab === 'active' ? (
            activeGoals.map(goal => (
              <div key={goal.id} className="goal-card">
                <h3>{goal.goal_name}</h3>
                <p>Type: {getGoalTypeLabel(goal.goal_type)}</p>
                <p>Target: {goal.goal_value} {getGoalUnit(goal.goal_type)}</p>
                {!goal.is_daily && <p>End Date: {new Date(goal.end_date).toLocaleDateString()}</p>}
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{width: `${(goal.current_progress / goal.goal_value) * 100}%`}}
                  ></div>
                </div>
                <div className="goal-actions">
                  <button onClick={() => handleComplete(goal.id)}>Complete</button>
                  <button onClick={() => handleDelete(goal.id)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            completedGoals.map(goal => (
              <div key={goal.id} className="goal-card completed">
                <h3>{goal.goal_name}</h3>
                <p>Type: {getGoalTypeLabel(goal.goal_type)}</p>
                <p>Completed on: {new Date(goal.end_date).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Goals; 