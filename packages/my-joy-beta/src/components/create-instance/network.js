import React from 'react';
import { Field } from 'redux-form';
import { Margin, Padding } from 'styled-components-spacing';
import styled from 'styled-components';
import Flex, { FlexItem } from 'styled-flex-component';
import remcalc from 'remcalc';

import {
  H4,
  P,
  Card,
  CardHeader,
  CardHeaderMeta,
  CardHeaderBox,
  CardOutlet,
  FormGroup,
  FormLabel,
  Input,
  Checkbox,
  Divider,
  FabricIcon,
  DataCenterIcon,
  PublicIcon,
  PrivateIcon,
  ArrowIcon
} from 'joyent-ui-toolkit';

const Box = styled.div`
  display: inline-block;
  background-color: ${props => props.theme.white};
  border: ${remcalc(1)} solid ${props => props.theme.grey};
  border-radius: ${remcalc(4)};
  min-width: ${remcalc(300)};
`;

export const Collapsed = ({ name, fabric, ...network }) => (
  <Margin inline right={3} top={3}>
    <Box>
      <Flex column>
        <FlexItem>
          <Margin left={3} right={3} top={2} bottom={2}>
            <P>{name}</P>
          </Margin>
        </FlexItem>
        <FlexItem>
          <Divider height={remcalc(1)} />
        </FlexItem>
        <FlexItem>
          <Margin left={3} right={3} top={2} bottom={2}>
            <Flex>
              <Margin right={4}>
                <FlexItem>
                  <Flex alignCenter>
                    <FlexItem>
                      <Margin right={1}>
                        {network.public ? <PublicIcon /> : <PrivateIcon />}
                      </Margin>
                    </FlexItem>
                    <FlexItem>
                      <P>{network.public ? 'Public' : 'Private'}</P>
                    </FlexItem>
                  </Flex>
                </FlexItem>
              </Margin>
              <Margin>
                <FlexItem>
                  <Flex alignCenter>
                    <FlexItem>
                      <Margin right={1}>
                        {fabric ? <FabricIcon /> : <DataCenterIcon />}
                      </Margin>
                    </FlexItem>
                    <FlexItem>
                      <P>{fabric ? 'Fabric' : 'Data center network'}</P>
                    </FlexItem>
                  </Flex>
                </FlexItem>
              </Margin>
            </Flex>
          </Margin>
        </FlexItem>
      </Flex>
    </Box>
  </Margin>
);

export const Expanded = ({
  id,
  name,
  fabric,
  subnet,
  description,
  provision_start_ip,
  provision_end_ip,
  selected = false,
  infoExpanded = false,
  onInfoClick,
  ...network
}) => (
  <Margin bottom={4}>
    <Card shadow>
      <CardHeader secondary={selected}>
        <CardHeaderBox>
          <FormGroup name={id} field={Field}>
            <Checkbox noMargin />
          </FormGroup>
        </CardHeaderBox>
        <CardHeaderMeta paddingLeft={0}>
          <H4 white={selected}>{name}</H4>
        </CardHeaderMeta>
      </CardHeader>
      <CardOutlet>
        <Padding all={4}>
          {description && (
            <Margin bottom={3}>
              <P>{description}</P>
            </Margin>
          )}
          <Flex>
            <Margin right={4}>
              <FlexItem>
                <Flex alignCenter>
                  <FlexItem>
                    <Margin right={1}>
                      {network.public ? <PublicIcon /> : <PrivateIcon />}
                    </Margin>
                  </FlexItem>
                  <FlexItem>
                    <P>{network.public ? 'Public' : 'Private'}</P>
                  </FlexItem>
                </Flex>
              </FlexItem>
            </Margin>
            <Margin right={4}>
              <FlexItem>
                <Flex alignCenter>
                  <FlexItem>
                    <Margin right={1}>
                      {fabric ? <FabricIcon /> : <DataCenterIcon />}
                    </Margin>
                  </FlexItem>
                  <FlexItem>
                    <P>{fabric ? 'Fabric' : 'Data center network'}</P>
                  </FlexItem>
                </Flex>
              </FlexItem>
            </Margin>
          </Flex>
          {fabric ? (
            <Margin top={3}>
              <Card collapsed={!infoExpanded} actionable={!infoExpanded}>
                <CardHeader
                  secondary={false}
                  transparent={false}
                  onClick={onInfoClick}
                >
                  <CardHeaderMeta>
                    <Padding left={3} right={3}>
                      <P>Network information</P>
                    </Padding>
                  </CardHeaderMeta>
                  <CardHeaderBox>
                    <ArrowIcon direction={infoExpanded ? 'up' : 'down'} />
                  </CardHeaderBox>
                </CardHeader>
                {infoExpanded ? (
                  <CardOutlet>
                    <Padding all={3}>
                      <Flex column>
                        <FlexItem>
                          <FormGroup name="id">
                            <FormLabel>ID</FormLabel>
                            <Input type="text" value={id} />
                          </FormGroup>
                        </FlexItem>
                        <FlexItem>
                          <FormGroup name="subnet">
                            <FormLabel>Subnet</FormLabel>
                            <Input type="text" value={subnet} />
                          </FormGroup>
                        </FlexItem>
                        <FlexItem>
                          <FormGroup name="ip-range">
                            <FormLabel>IP range</FormLabel>
                            <Input
                              type="text"
                              value={`${provision_start_ip} - ${provision_end_ip}`}
                            />
                          </FormGroup>
                        </FlexItem>
                      </Flex>
                    </Padding>
                  </CardOutlet>
                ) : null}
              </Card>
            </Margin>
          ) : null}
        </Padding>
      </CardOutlet>
    </Card>
  </Margin>
);

export default ({ small = false, ...rest }) =>
  small ? <Collapsed {...rest} /> : <Expanded {...rest} />;