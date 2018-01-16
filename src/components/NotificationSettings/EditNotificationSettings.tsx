import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Card, TextField } from '@shopify/polaris';
import { NotificationSettings, RootState } from '../../types';
import {
  editNotificationThreshold,
  EditNotificationThreshold,
  notificationPermissionRequest
} from '../../actions/notifications';

interface Props {
  notificationSettings: NotificationSettings;
}

interface Handlers {
  readonly onChange: (val: number) => void;
  readonly onEnable: () => void;
}

interface State {
  readonly value: string;
  readonly error: null | string;
}

class EditNotificationSettings extends React.PureComponent<
  Props & Handlers,
  State
> {
  constructor(props: Props & Handlers) {
    super(props);
    this.state = {
      error: null,
      value: props.notificationSettings.minReward.toString()
    };
  }

  private handleChange = (value: string) => {
    this.setState({ value, error: null });
    this.setErrorIfAny(value);
    this.props.onChange(Math.max(+value, 0) || 0);
  };

  private setErrorIfAny = (value: string) => {
    if (+value < 0) {
      this.setState({
        error: 'Minimum reward cannot be negative.'
      });
    }
  };

  public render() {
    const { hasPermission } = this.props.notificationSettings;

    return hasPermission ? (
      <Card
        sectioned
        title="Edit Notification Settings"
        actions={[
          {
            content: 'Request Permission',
            onAction: this.props.onEnable
          }
        ]}
      >
        <TextField
          id="edit-notification-threshold"
          label="Minimum Reward"
          helpText="Only HITs rewarding at least this amount will be sent to your desktop."
          type="number"
          prefix="$"
          step={0.05}
          autoComplete={false}
          spellCheck={false}
          value={this.state.value}
          onChange={this.handleChange}
          min={0}
          error={this.state.error || false}
        />
      </Card>
    ) : null;
  }
}

const mapState = (state: RootState): Props => ({
  notificationSettings: state.notificationSettings
});

const mapDispatch = (
  dispatch: Dispatch<EditNotificationThreshold>
): Handlers => ({
  onChange: (value: number) => dispatch(editNotificationThreshold(value)),
  onEnable: () => dispatch(notificationPermissionRequest())
});

export default connect(mapState, mapDispatch)(EditNotificationSettings);
