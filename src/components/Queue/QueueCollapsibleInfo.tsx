import * as React from 'react';
import { connect } from 'react-redux';
import { Collapsible, Card, Stack, Caption } from '@shopify/polaris';
import { RootState, QueueItem } from '../../types';
import KnownRequesterButton from '../SearchCard/KnownRequesterButton';
import BlockRequesterButton from '../SearchCard/BlockRequesterButton';
import AddAsWatcherButton from '../SearchCard/AddAsWatcherButton';

interface Props {
  readonly hit: QueueItem;
  readonly expanded: boolean;
}

interface OwnProps {
  readonly hitId: string;
  readonly requesterId: string;
  readonly requesterName: string;
  readonly knownRequester: boolean;
}

class CollapsibleInfo extends React.PureComponent<Props & OwnProps, never> {
  public render() {
    const { hit, expanded, knownRequester } = this.props;
    const { description, requester } = hit;

    return (
      <Collapsible open={expanded}>
        <Card.Section>
          <Stack vertical spacing="loose">
            <Caption>{`Requester: ${requester.name}`}</Caption>
            <Caption>
              {`Description: ${description || 'No description.'}`}
            </Caption>
            {knownRequester ? (
              <KnownRequesterButton {...this.props} />
            ) : (
              undefined
            )}
            <Stack vertical={false} alignment="center">
              <BlockRequesterButton requester={requester} />
              <AddAsWatcherButton hit={hit} />
            </Stack>
          </Stack>
        </Card.Section>
      </Collapsible>
    );
  }
}

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  hit: state.queue.get(ownProps.hitId),
  expanded: true
});

export default connect(mapState)(CollapsibleInfo);