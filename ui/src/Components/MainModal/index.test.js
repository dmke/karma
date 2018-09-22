import React from "react";

import { mount } from "enzyme";

import { AlertStore } from "Stores/AlertStore";
import { Settings } from "Stores/Settings";
import { MainModal } from ".";

let alertStore;
let settingsStore;

beforeAll(() => {
  jest.useFakeTimers();
});

beforeEach(() => {
  alertStore = new AlertStore([]);
  settingsStore = new Settings();
});

const MountedMainModal = () => {
  return mount(
    <MainModal alertStore={alertStore} settingsStore={settingsStore} />
  );
};

describe("<MainModal />", () => {
  it("only renders FontAwesomeIcon when modal is not shown", () => {
    const tree = MountedMainModal();
    expect(tree.find("FontAwesomeIcon")).toHaveLength(1);
    expect(tree.find("MainModalContent")).toHaveLength(0);
  });

  it("renders the modal when it is shown", () => {
    const tree = MountedMainModal();
    const toggle = tree.find(".nav-link");
    toggle.simulate("click");
    expect(tree.find("FontAwesomeIcon")).not.toHaveLength(0);
    expect(tree.find("MainModalContent")).toHaveLength(1);
  });

  it("hides the modal when toggle() is called twice", () => {
    const tree = MountedMainModal();
    const toggle = tree.find(".nav-link");

    toggle.simulate("click");
    jest.runOnlyPendingTimers();
    tree.update();
    expect(tree.find("MainModalContent")).toHaveLength(1);

    toggle.simulate("click");
    jest.runOnlyPendingTimers();
    tree.update();
    expect(tree.find("MainModalContent")).toHaveLength(0);
  });

  it("hides the modal when hide() is called", () => {
    const tree = MountedMainModal();
    const toggle = tree.find(".nav-link");

    toggle.simulate("click");
    expect(tree.find("MainModalContent")).toHaveLength(1);

    const instance = tree.instance();
    instance.toggle.hide();
    jest.runOnlyPendingTimers();
    tree.update();
    expect(tree.find("MainModalContent")).toHaveLength(0);
  });

  it("'modal-open' class is appended to body node when modal is visible", () => {
    const tree = MountedMainModal();
    const toggle = tree.find(".nav-link");
    toggle.simulate("click");
    expect(document.body.className.split(" ")).toContain("modal-open");
  });

  it("'modal-open' class is removed from body node after modal is hidden", () => {
    const tree = MountedMainModal();
    const toggle = tree.find(".nav-link");
    toggle.simulate("click");
    toggle.simulate("click");
    expect(document.body.className.split(" ")).not.toContain("modal-open");
  });

  it("'modal-open' class is removed from body node after modal is unmounted", () => {
    const tree = MountedMainModal();
    const toggle = tree.find(".nav-link");
    toggle.simulate("click");
    tree.unmount();
    expect(document.body.className.split(" ")).not.toContain("modal-open");
  });
});
