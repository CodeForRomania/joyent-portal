import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import get from 'lodash.get';

import { PageContainer } from 'joyent-ui-toolkit';

import { Breadcrumb, Menu } from '@containers/navigation';
import { Header } from '@components/navigation';
import Footer from '@components/navigation/footer';

import {
  List as Instances,
  Summary as InstanceSummary,
  Tags as InstanceTags,
  Metadata as InstanceMetadata,
  Networks as InstanceNetworks,
  Firewall as InstanceFirewall,
  Dns as InstanceDns,
  Snapshots as InstanceSnapshots,
  Resize as InstanceResize
} from '@containers/instances';
import CreateInstance from '@containers/create-instance';

export default () => (
  <BrowserRouter>
    <PageContainer>
      {/* Header */}
      <Route path="*" component={Header} />

      {/* Breadcrumb */}
      <Switch>
        <Route
          path="/instances/~create/:section?"
          exact
          component={Breadcrumb}
        />
        <Route
          path="/instances/~:action/:instance?"
          exact
          component={Breadcrumb}
        />
        <Route path="/instances/:instance?" component={Breadcrumb} />
      </Switch>

      {/* Menu */}
      <Switch>
        <Route path="/instances/~:action/:id?" exact component={Menu} />
        <Route path="/instances/:instance?/:section?" component={Menu} />
      </Switch>

      {/* Instances List */}
      <Switch>
        <Route path="/instances" exact component={Instances} />
      </Switch>

      {/* Instance Sections */}
      <Switch>
        <Route path="/instances/~:action" component={() => null} />
        <Route
          path="/instances/:instance/summary"
          exact
          component={InstanceSummary}
        />
        <Route
          path="/instances/:instance/tags"
          exact
          component={InstanceTags}
        />
        <Route
          path="/instances/:instance/metadata"
          exact
          component={InstanceMetadata}
        />
        <Route
          path="/instances/:instance/networks"
          exact
          component={InstanceNetworks}
        />
        <Route
          path="/instances/:instance/firewall"
          exact
          component={InstanceFirewall}
        />
        <Route path="/instances/:instance/dns" exact component={InstanceDns} />
        <Route
          path="/instances/:instance/snapshots"
          exact
          component={InstanceSnapshots}
        />
        <Route
          path="/instances/:instance"
          exact
          component={({ match }) => (
            <Redirect
              to={`/instances/${get(match, 'params.instance')}/summary`}
            />
          )}
        />
      </Switch>

      {/* Actions */}
      <Switch>
        {/* Create Instance */}
        <Route
          path="/instances/~create/"
          exact
          component={() => <Redirect to="/instances/~create/name" />}
        />
        <Route
          path="/instances/~create/name"
          exact
          component={props => <CreateInstance {...props} step="name" />}
        />
        <Route
          path="/instances/~create/image"
          exact
          component={props => <CreateInstance {...props} step="image" />}
        />
        <Route
          path="/instances/~create/package"
          exact
          component={props => <CreateInstance {...props} step="package" />}
        />
        <Route
          path="/instances/~create/tags"
          exact
          component={props => <CreateInstance {...props} step="tags" />}
        />
        <Route
          path="/instances/~create/metadata"
          exact
          component={props => <CreateInstance {...props} step="metadata" />}
        />
        <Route
          path="/instances/~create/user-script"
          exact
          component={props => <CreateInstance {...props} step="user-script" />}
        />
        <Route
          path="/instances/~create/networks"
          exact
          component={props => <CreateInstance {...props} step="networks" />}
        />
        <Route
          path="/instances/~create/firewall"
          exact
          component={props => <CreateInstance {...props} step="firewall" />}
        />
        <Route
          path="/instances/~create/cns"
          exact
          component={props => <CreateInstance {...props} step="cns" />}
        />
        <Route
          path="/instances/~create/affinity"
          exact
          component={props => <CreateInstance {...props} step="affinity" />}
        />
        <Route
          path="/instances/~create/done"
          exact
          component={props => <CreateInstance {...props} step="done" />}
        />

        <Route
          path="/instances/~resize/:instance"
          exact
          component={InstanceResize}
        />
        <Route
          path="/instances/:instance/:section?/~resize"
          exact
          component={InstanceResize}
        />
      </Switch>

      <Route path="/" exact component={() => <Redirect to="/instances" />} />
      <Footer />
    </PageContainer>
  </BrowserRouter>
);
