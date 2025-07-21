import { Button, Card, Input, Select, Switch, Tabs } from "antd";
import {
  Bell,
  Eye,
  EyeOff,
  Lock,
  Mic,
  Palette,
  Save,
  User,
} from "lucide-react";
import React, { useState } from "react";

const { Option } = Select;
const { TabPane } = Tabs;

export const Settings = ({ user }) => {
  // const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    transcriptionComplete: true,
    reviewRequired: true,
    systemUpdates: false,
  });

  const saveSettings = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-600">
            Manage your account and application preferences
          </p>
        </div>
        <Button onClick={saveSettings} icon={<Save className="w-4 h-4" />}>
          Save Changes
        </Button>
      </div>

      <Tabs defaultActiveKey="profile">
        <TabPane tab="Profile" key="profile">
          <Card title="Profile Information" extra={<User className="w-5 h-5" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="First Name" defaultValue={user.name.split(" ")[0]} />
              <Input placeholder="Last Name" defaultValue={user.name.split(" ").slice(1).join(" ")} />
            </div>
            <Input className="mt-4" placeholder="Email Address" defaultValue={user.email} />

            {user.role === "doctor" && (
              <Select defaultValue={user.specialty?.toLowerCase()} className="mt-4 w-full">
                <Option value="cardiology">Cardiology</Option>
                <Option value="neurology">Neurology</Option>
                <Option value="orthopedics">Orthopedics</Option>
                <Option value="internal-medicine">Internal Medicine</Option>
                <Option value="pediatrics">Pediatrics</Option>
                <Option value="surgery">Surgery</Option>
              </Select>
            )}
            <Input className="mt-4" placeholder="Phone Number" />
          </Card>
        </TabPane>

        <TabPane tab="Security" key="security">
          <Card title="Password & Security" extra={<Lock className="w-5 h-5" />}>
            <Input.Password placeholder="Current Password" className="mt-2" />
            <Input.Password placeholder="New Password" className="mt-4" />
            <Input.Password placeholder="Confirm New Password" className="mt-4" />

            <div className="flex justify-between items-center mt-4">
              <span>Two-Factor Authentication</span>
              <Switch />
            </div>
            <div className="flex justify-between items-center mt-4">
              <span>Login Notifications</span>
              <Switch defaultChecked />
            </div>
          </Card>
        </TabPane>

        <TabPane tab="Audio" key="audio">
          <Card title="Audio Configuration" extra={<Mic className="w-5 h-5" />}>
            <Select defaultValue="default" className="w-full mt-2">
              <Option value="default">Default System Microphone</Option>
              <Option value="usb">USB Headset Microphone</Option>
              <Option value="bluetooth">Bluetooth Headset</Option>
            </Select>
            <Select defaultValue="high" className="w-full mt-4">
              <Option value="low">Low (16kHz)</Option>
              <Option value="medium">Medium (22kHz)</Option>
              <Option value="high">High (44kHz)</Option>
            </Select>
            <Select defaultValue="medium" className="w-full mt-4">
              <Option value="off">Off</Option>
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
            </Select>
            <div className="flex justify-between items-center mt-4">
              <span>Auto-gain Control</span>
              <Switch defaultChecked />
            </div>
            <div className="flex justify-between items-center mt-4">
              <span>Echo Cancellation</span>
              <Switch defaultChecked />
            </div>
          </Card>
        </TabPane>

        <TabPane tab="Preferences" key="preferences">
          <Card title="Application Preferences" extra={<Palette className="w-5 h-5" />}>
            <div className="flex justify-between items-center mt-2">
              <span>Dark Mode</span>
              <Switch checked={darkMode} onChange={setDarkMode} />
            </div>
            <Select defaultValue="pdf" className="w-full mt-4">
              <Option value="pdf">PDF</Option>
              <Option value="docx">Microsoft Word</Option>
              <Option value="txt">Plain Text</Option>
            </Select>
            <Select defaultValue="en" className="w-full mt-4">
              <Option value="en">English</Option>
              <Option value="es">Spanish</Option>
              <Option value="fr">French</Option>
            </Select>
            <Select defaultValue="est" className="w-full mt-4">
              <Option value="est">Eastern Time (EST)</Option>
              <Option value="cst">Central Time (CST)</Option>
              <Option value="mst">Mountain Time (MST)</Option>
              <Option value="pst">Pacific Time (PST)</Option>
            </Select>
            <div className="flex justify-between items-center mt-4">
              <span>Auto-save Drafts</span>
              <Switch defaultChecked />
            </div>
            <div className="flex justify-between items-center mt-4">
              <span>Show Medical Term Highlights</span>
              <Switch defaultChecked />
            </div>
          </Card>
        </TabPane>

        <TabPane tab="Notifications" key="notifications">
          <Card title="Notification Preferences" extra={<Bell className="w-5 h-5" />}>
            <div className="flex justify-between items-center mt-2">
              <span>Email Notifications</span>
              <Switch
                checked={notifications.email}
                onChange={(checked) =>
                  setNotifications({ ...notifications, email: checked })
                }
              />
            </div>
            <div className="flex justify-between items-center mt-4">
              <span>Push Notifications</span>
              <Switch
                checked={notifications.push}
                onChange={(checked) =>
                  setNotifications({ ...notifications, push: checked })
                }
              />
            </div>
            <h4 className="font-medium mt-6">Notification Types</h4>
            <div className="flex justify-between items-center mt-4">
              <span>Transcription Complete</span>
              <Switch
                checked={notifications.transcriptionComplete}
                onChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    transcriptionComplete: checked,
                  })
                }
              />
            </div>
            <div className="flex justify-between items-center mt-4">
              <span>Review Required</span>
              <Switch
                checked={notifications.reviewRequired}
                onChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    reviewRequired: checked,
                  })
                }
              />
            </div>
            <div className="flex justify-between items-center mt-4">
              <span>System Updates</span>
              <Switch
                checked={notifications.systemUpdates}
                onChange={(checked) =>
                  setNotifications({
                    ...notifications,
                    systemUpdates: checked,
                  })
                }
              />
            </div>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};
