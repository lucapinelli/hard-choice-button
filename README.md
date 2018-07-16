# hard-choice-button

Simple example that uses [react-automata](https://github.com/MicheleBertoli/react-automata) to implement an HardChoiceButton.

The button will work in the following way:
1. the button starts in a **ready** state and when a user presses the button, it enters the **pending** state.
2. During the **pending** state a timer is ticking down from 5. At any time during this countdown, the user can press the button again to abort the operation, taking them to the **aborted** state. If the user doesn't press the button during pending, and the countdown makes it all the way to 0, then it enters the **boom** state.
3. if the user clicks the button in the **aborted**, the button enters in the **ready** state.

### Notes

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
