import { Badge, Button, Input, Select, Switch, Card } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  Download,
  FileText,
  Mic,
  Save,
  Send,
  Square,
  User,
  Volume2,
  Pause,
  Play,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const { Option } = Select;

const Label = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
    {children}
  </label>
);

export const NewTranscription = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [sendToTranscriptionist, setSendToTranscriptionist] = useState(false);
  const [micLevel, setMicLevel] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);

  const intervalRef = useRef();
  const textareaRef = useRef(null);

  const simulateTranscription = () => {
    const medicalPhrases = [
      "Patient presents with chest pain and shortness of breath.",
      "Blood pressure is 140 over 90.",
      "Heart rate is regular at 72 beats per minute.",
      "Lungs are clear to auscultation bilaterally.",
      "No murmurs, rubs, or gallops appreciated.",
      "Abdomen is soft, non-tender, non-distended.",
      "Extremities show no edema or cyanosis.",
      "Neurological examination is within normal limits.",
      "Recommend ECG and chest X-ray.",
      "Patient advised to follow up in one week.",
    ];

    let phraseIndex = 0;
    const transcriptionInterval = setInterval(() => {
      if (phraseIndex < medicalPhrases.length && isRecording && !isPaused) {
        setTranscript((prev) => {
          const newText =
            prev + (prev ? " " : "") + medicalPhrases[phraseIndex];
          phraseIndex++;
          return newText;
        });

        setMicLevel(Math.random() * 100);

        if (autoScroll && textareaRef.current) {
          textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
        }
      } else {
        clearInterval(transcriptionInterval);
      }
    }, 2000);

    return transcriptionInterval;
  };

  useEffect(() => {
    if (isRecording && !isPaused) {
      intervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      const transcriptionInterval = simulateTranscription();

      return () => {
        clearInterval(transcriptionInterval);
      };
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRecording, isPaused, autoScroll]);

  const startRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
  };

  const pauseRecording = () => {
    setIsPaused(!isPaused);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    setMicLevel(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const saveDraft = () => {
    alert("Draft saved successfully!");
  };

  const finalizeTranscription = () => {
    if (sendToTranscriptionist) {
      alert("Transcription sent to transcriptionist for review!");
    } else {
      alert("Transcription finalized!");
    }
  };

  const exportToPDF = () => {
    alert("Exporting to PDF...");
  };

  const exportToWord = () => {
    alert("Exporting to Word...");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">New Transcription</h1>
          <p className="text-gray-600">Create a new medical transcription</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={saveDraft}
            icon={<Save />}
            type="default"
            className="text-xs"
          >
            Save Draft
          </Button>
          <Button
            onClick={finalizeTranscription}
            type="primary"
            icon={<Send />}
            className="text-xs"
          >
            {sendToTranscriptionist ? "Send to Review" : "Finalize"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <Card
            title={
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" /> <h3>Patient Information</h3>
              </div>
            }
          >
            <div className="space-y-2 mb-4">
              <Label htmlFor="patientName">Patient Name</Label>
              <Input
                id="patientName"
                placeholder="Enter patient name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </div>

            <div className="space-y-2 mb-4">
              <Label htmlFor="patientId">Patient ID</Label>
              <Input
                id="patientId"
                placeholder="Enter patient ID"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              />
            </div>

            <div className="space-y-2 mb-4">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>

            <div className="space-y-2 mb-4">
              <Label htmlFor="specialty">Doctor Specialty</Label>
              <Select
                value={specialty}
                onChange={(value) => setSpecialty(value)}
                placeholder="Select specialty"
                style={{ width: "100%" }}
              >
                <Option value="cardiology">Cardiology</Option>
                <Option value="neurology">Neurology</Option>
                <Option value="orthopedics">Orthopedics</Option>
                <Option value="internal-medicine">Internal Medicine</Option>
                <Option value="pediatrics">Pediatrics</Option>
                <Option value="surgery">Surgery</Option>
              </Select>
            </div>
          </Card>

          <Card
            title={
              <div className="flex items-center gap-2">
                <Mic className="w-5 h-5" /> <h3>Recording Controls</h3>
              </div>
            }
          >
            <div className="text-center">
              <div className="text-2xl font-mono font-bold">
                {formatTime(recordingTime)}
              </div>
              <div className="flex items-center justify-center gap-2 mt-2">
                {isRecording && (
                  <span
                    className={`px-3 py-1 rounded text-xs ${
                      isPaused ? "bg-gray-300" : "bg-red-500 text-white"
                    }`}
                  >
                    {isPaused ? "Paused" : "Recording"}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                <span className="text-sm">Mic Level</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-200"
                  style={{ width: `${micLevel}%` }}
                />
              </div>
            </div>

            <div className="flex gap-2 mt-2">
              {!isRecording ? (
                <Button onClick={startRecording} icon={<Mic />} block>
                  Start
                </Button>
              ) : (
                <>
                  <Button
                    onClick={pauseRecording}
                    icon={isPaused ? <Play /> : <Pause />}
                    block
                  >
                    {isPaused ? "Resume" : "Pause"}
                  </Button>
                  <Button
                    onClick={stopRecording}
                    danger
                    icon={<Square />}
                    block
                  >
                    Stop
                  </Button>
                </>
              )}
            </div>
          </Card>

          <Card title="Options">
            <div className="flex items-center justify-between pb-2">
              <Label htmlFor="autoScroll">Auto-scroll transcript</Label>
              <Switch
                id="autoScroll"
                checked={autoScroll}
                onChange={setAutoScroll}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="sendToTranscriptionist">
                Send to transcriptionist
              </Label>
              <Switch
                id="sendToTranscriptionist"
                checked={sendToTranscriptionist}
                onChange={setSendToTranscriptionist}
              />
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card
            title={
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" /> <h3>Live Transcript</h3>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={exportToPDF}
                    icon={<Download />}
                    className="text-xs"
                  >
                    PDF
                  </Button>
                  <Button
                    onClick={exportToWord}
                    icon={<Download />}
                    className="text-xs"
                  >
                    Word
                  </Button>
                </div>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-2 bg-blue-500 rounded"></div>
                  <span>Medical Terms</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-2 bg-green-500 rounded"></div>
                  <span>Drug Names</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-2 bg-red-500 rounded"></div>
                  <span>Potential Errors</span>
                </div>
              </div>

              <TextArea
                ref={textareaRef}
                rows={8}
                placeholder="Transcription will appear here as you speak..."
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                className="min-h-[400px] font-mono text-sm leading-relaxed"
              />

              <div className="text-sm text-gray-500">
                Words:{" "}
                {transcript.split(" ").filter((word) => word.length > 0).length}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
