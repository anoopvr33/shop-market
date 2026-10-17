"use client";

import {
  Check,
  ChevronLeft,
  ChevronRight,
  ImagePlus,
  MapPin,
  Upload,
  User,
  Store,
  FileText,
  CreditCard,
  Truck,
  ShieldCheck,
  X,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

// ============================================================
// TYPES
// ============================================================

type SellerForm = {
  // Seller
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;

  // Shop
  shopName: string;
  shopType: string;
  shopDescription: string;

  // GST
  businessType: string;
  businessName: string;
  gstNumber: string;
  panNumber: string;

  // Location
  state: string;
  district: string;
  city: string;
  pincode: string;
  address: string;
  landmark: string;

  // Delivery
  deliveryAvailable: boolean;
  pickupAvailable: boolean;

  // Bank
  accountHolder: string;
  bankName: string;
  accountNumber: string;
  confirmAccountNumber: string;
  ifsc: string;
  upi: string;
};

type FileState = {
  profileImage: File | null;
  shopLogo: File | null;
  shopBanner: File | null;
  aadharFront: File | null;
  aadharBack: File | null;
  panDocument: File | null;
  gstDocument: File | null;
  shopLicense: File | null;
};

// ============================================================
// STEPS
// ============================================================

const steps = [
  {
    id: 1,
    title: "Seller",
    description: "Personal details",
    icon: User,
  },
  {
    id: 2,
    title: "Shop",
    description: "Shop information",
    icon: Store,
  },
  {
    id: 3,
    title: "Business",
    description: "GST & business",
    icon: FileText,
  },
  {
    id: 4,
    title: "Location",
    description: "Address & delivery",
    icon: MapPin,
  },
  {
    id: 5,
    title: "Bank",
    description: "Payment details",
    icon: CreditCard,
  },
  {
    id: 6,
    title: "Documents",
    description: "Verification",
    icon: ShieldCheck,
  },
  {
    id: 7,
    title: "Finish",
    description: "Review & submit",
    icon: Check,
  },
];

// ============================================================
// INITIAL FORM
// ============================================================

const initialForm: SellerForm = {
  fullName: "",
  email: "",
  phone: "",
  whatsapp: "",

  shopName: "",
  shopType: "",
  shopDescription: "",

  businessType: "",
  businessName: "",
  gstNumber: "",
  panNumber: "",

  state: "",
  district: "",
  city: "",
  pincode: "",
  address: "",
  landmark: "",

  deliveryAvailable: true,
  pickupAvailable: false,

  accountHolder: "",
  bankName: "",
  accountNumber: "",
  confirmAccountNumber: "",
  ifsc: "",
  upi: "",
};

// ============================================================
// INITIAL FILES
// ============================================================

const initialFiles: FileState = {
  profileImage: null,
  shopLogo: null,
  shopBanner: null,
  aadharFront: null,
  aadharBack: null,
  panDocument: null,
  gstDocument: null,
  shopLicense: null,
};

// ============================================================
// COMPONENT
// ============================================================

export default function SellerOnboarding() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState<SellerForm>(initialForm);

  const [files, setFiles] = useState<FileState>(initialFiles);

  const [previews, setPreviews] = useState({
    profileImage: "",
    shopLogo: "",
    shopBanner: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [submitting, setSubmitting] = useState(false);

  const [saved, setSaved] = useState(false);

  const [draftLoaded, setDraftLoaded] = useState(false);

  // ============================================================
  // REFS
  // ============================================================

  const profileInput = useRef<HTMLInputElement>(null);

  const logoInput = useRef<HTMLInputElement>(null);

  const bannerInput = useRef<HTMLInputElement>(null);

  const aadharFrontInput = useRef<HTMLInputElement>(null);

  const aadharBackInput = useRef<HTMLInputElement>(null);

  const panInput = useRef<HTMLInputElement>(null);

  const gstInput = useRef<HTMLInputElement>(null);

  const licenseInput = useRef<HTMLInputElement>(null);

  // ============================================================
  // LOAD LOCAL STORAGE
  // ============================================================

  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem("shopease-seller-draft");

      const savedStep = localStorage.getItem("shopease-seller-step");

      if (savedDraft) {
        setForm({
          ...initialForm,
          ...JSON.parse(savedDraft),
        });

        setDraftLoaded(true);
      }

      if (savedStep) {
        const parsedStep = Number(savedStep);

        if (parsedStep >= 1 && parsedStep <= steps.length) {
          setStep(parsedStep);
        }
      }
    } catch (error) {
      console.error("Failed to load seller draft", error);
    }
  }, []);

  // ============================================================
  // AUTO SAVE FORM
  // ============================================================

  useEffect(() => {
    if (!draftLoaded) return;

    localStorage.setItem("shopease-seller-draft", JSON.stringify(form));

    localStorage.setItem("shopease-seller-step", String(step));

    setSaved(true);

    const timer = setTimeout(() => {
      setSaved(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [form, step, draftLoaded]);

  // ============================================================
  // CHANGE INPUT
  // ============================================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ============================================================
  // BOOLEAN CHANGE
  // ============================================================

  const handleBooleanChange = (
    name: "deliveryAvailable" | "pickupAvailable",
    value: boolean,
  ) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================================================
  // IMAGE FILE
  // ============================================================

  const handleImage = (
    field: "profileImage" | "shopLogo" | "shopBanner",
    file: File | undefined,
  ) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        [field]: "Please select an image file.",
      }));

      return;
    }

    // 5 MB
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        [field]: "Image must be smaller than 5MB.",
      }));

      return;
    }

    const preview = URL.createObjectURL(file);

    setFiles((prev) => ({
      ...prev,
      [field]: file,
    }));

    setPreviews((prev) => ({
      ...prev,
      [field]: preview,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  // ============================================================
  // DOCUMENT FILE
  // ============================================================

  const handleDocument = (
    field:
      | "aadharFront"
      | "aadharBack"
      | "panDocument"
      | "gstDocument"
      | "shopLicense",
    file: File | undefined,
  ) => {
    if (!file) return;

    // 10 MB
    if (file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        [field]: "File must be smaller than 10MB.",
      }));

      return;
    }

    setFiles((prev) => ({
      ...prev,
      [field]: file,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  // ============================================================
  // REMOVE IMAGE
  // ============================================================

  const removeImage = (field: "profileImage" | "shopLogo" | "shopBanner") => {
    if (previews[field]) {
      URL.revokeObjectURL(previews[field]);
    }

    setFiles((prev) => ({
      ...prev,
      [field]: null,
    }));

    setPreviews((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  // ============================================================
  // VALIDATION
  // ============================================================

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    // ----------------------------------------------------------
    // STEP 1
    // ----------------------------------------------------------

    if (currentStep === 1) {
      if (!form.fullName.trim()) {
        newErrors.fullName = "Full name is required.";
      }

      if (!form.email.trim()) {
        newErrors.email = "Email is required.";
      } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
        newErrors.email = "Enter a valid email.";
      }

      if (!form.phone.trim()) {
        newErrors.phone = "Phone number is required.";
      } else if (form.phone.replace(/\D/g, "").length < 10) {
        newErrors.phone = "Enter a valid phone number.";
      }
    }

    // ----------------------------------------------------------
    // STEP 2
    // ----------------------------------------------------------

    if (currentStep === 2) {
      if (!form.shopName.trim()) {
        newErrors.shopName = "Shop name is required.";
      }

      if (!form.shopType) {
        newErrors.shopType = "Select your shop type.";
      }

      if (!form.shopDescription.trim()) {
        newErrors.shopDescription = "Add a short shop description.";
      }
    }

    // ----------------------------------------------------------
    // STEP 3
    // ----------------------------------------------------------

    if (currentStep === 3) {
      if (!form.businessType) {
        newErrors.businessType = "Select business type.";
      }

      if (!form.panNumber.trim()) {
        newErrors.panNumber = "PAN number is required.";
      } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(form.panNumber)) {
        newErrors.panNumber = "Enter a valid PAN number.";
      }

      // GST can be optional
    }

    // ----------------------------------------------------------
    // STEP 4
    // ----------------------------------------------------------

    if (currentStep === 4) {
      if (!form.state.trim()) {
        newErrors.state = "State is required.";
      }

      if (!form.district.trim()) {
        newErrors.district = "District is required.";
      }

      if (!form.city.trim()) {
        newErrors.city = "City is required.";
      }

      if (!form.pincode.trim()) {
        newErrors.pincode = "Pincode is required.";
      } else if (!/^\d{6}$/.test(form.pincode)) {
        newErrors.pincode = "Enter a valid 6-digit pincode.";
      }

      if (!form.address.trim()) {
        newErrors.address = "Shop address is required.";
      }
    }

    // ----------------------------------------------------------
    // STEP 5
    // ----------------------------------------------------------

    if (currentStep === 5) {
      if (!form.accountHolder.trim()) {
        newErrors.accountHolder = "Account holder name is required.";
      }

      if (!form.bankName.trim()) {
        newErrors.bankName = "Bank name is required.";
      }

      if (!form.accountNumber.trim()) {
        newErrors.accountNumber = "Account number is required.";
      }

      if (form.accountNumber !== form.confirmAccountNumber) {
        newErrors.confirmAccountNumber = "Account numbers do not match.";
      }

      if (!form.ifsc.trim()) {
        newErrors.ifsc = "IFSC is required.";
      }
    }

    // ----------------------------------------------------------
    // STEP 6
    // ----------------------------------------------------------

    if (currentStep === 6) {
      if (!files.aadharFront) {
        newErrors.aadharFront = "Aadhar front is required.";
      }

      if (!files.aadharBack) {
        newErrors.aadharBack = "Aadhar back is required.";
      }

      if (!files.panDocument) {
        newErrors.panDocument = "PAN document is required.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ============================================================
  // NEXT
  // ============================================================

  const handleNext = () => {
    if (!validateStep(step)) {
      return;
    }

    if (step < steps.length) {
      setStep((prev) => prev + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // ============================================================
  // PREVIOUS
  // ============================================================

  const handlePrevious = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // ============================================================
  // SKIP
  // ============================================================

  const handleSkip = () => {
    setErrors({});

    if (step < steps.length) {
      setStep((prev) => prev + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // ============================================================
  // FORMDATA
  // ============================================================

  const createFormData = () => {
    const formData = new FormData();

    // ----------------------------------------------------------
    // TEXT DATA
    // ----------------------------------------------------------

    Object.entries(form).forEach(([key, value]) => {
      if (typeof value === "boolean") {
        formData.append(key, String(value));
      } else {
        formData.append(key, value);
      }
    });

    // ----------------------------------------------------------
    // FILES
    // ----------------------------------------------------------

    if (files.profileImage) {
      formData.append("profileImage", files.profileImage);
    }

    if (files.shopLogo) {
      formData.append("shopLogo", files.shopLogo);
    }

    if (files.shopBanner) {
      formData.append("shopBanner", files.shopBanner);
    }

    if (files.aadharFront) {
      formData.append("aadharFront", files.aadharFront);
    }

    if (files.aadharBack) {
      formData.append("aadharBack", files.aadharBack);
    }

    if (files.panDocument) {
      formData.append("panDocument", files.panDocument);
    }

    if (files.gstDocument) {
      formData.append("gstDocument", files.gstDocument);
    }

    if (files.shopLicense) {
      formData.append("shopLicense", files.shopLicense);
    }

    return formData;
  };

  // ============================================================
  // SUBMIT
  // ============================================================

  const handleSubmit = async () => {
    // Validate required document step
    if (!validateStep(6)) {
      setStep(6);
      return;
    }

    try {
      setSubmitting(true);

      const formData = createFormData();

      /*
       * YOUR API
       *
       * Replace this with your actual backend URL.
       */

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/seller/onboarding`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to submit seller onboarding.");
      }

      const data = await response.json();

      console.log("Seller created:", data);

      // Clear draft
      localStorage.removeItem("shopease-seller-draft");

      localStorage.removeItem("shopease-seller-step");

      alert("Seller profile submitted successfully!");
    } catch (error) {
      console.error(error);

      setErrors({
        submit: "Unable to submit your details. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ============================================================
  // FILE UPLOAD BOX
  // ============================================================

  const FileUpload = ({
    label,
    file,
    inputRef,
    accept,
    onChange,
    error,
  }: {
    label: string;
    file: File | null;
    inputRef: React.RefObject<HTMLInputElement | null>;
    accept: string;
    onChange: (file: File | undefined) => void;
    error?: string;
  }) => {
    return (
      <div>
        <p className="mb-2 text-sm text-white/60">{label}</p>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`
            flex
            min-h-[90px]
            w-full
            items-center
            gap-4
            rounded-2xl
            border
            border-dashed
            px-4
            text-left
            transition

            ${
              file
                ? "border-emerald-500/40 bg-emerald-500/5"
                : "border-white/15 bg-black/20 hover:border-white/30"
            }
          `}
        >
          <div
            className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-white/5
            text-white/50
          "
          >
            {file ? <Check size={20} /> : <Upload size={20} />}
          </div>

          <div className="min-w-0">
            {file ? (
              <>
                <p className="truncate text-sm font-medium text-emerald-300">
                  {file.name}
                </p>

                <p className="mt-1 text-xs text-white/30">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-white">Upload {label}</p>

                <p className="mt-1 text-xs text-white/30">
                  Click to choose file
                </p>
              </>
            )}
          </div>
        </button>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          hidden
          onChange={(e) => onChange(e.target.files?.[0])}
        />

        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      </div>
    );
  };

  // ============================================================
  // IMAGE UPLOAD
  // ============================================================

  const ImageUpload = ({
    label,
    field,
    inputRef,
  }: {
    label: string;
    field: "profileImage" | "shopLogo" | "shopBanner";
    inputRef: React.RefObject<HTMLInputElement | null>;
  }) => {
    const preview = previews[field];

    return (
      <div>
        <p className="mb-2 text-sm text-white/60">{label}</p>

        <div
          className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-dashed
          border-white/15
          bg-black/20
        "
        >
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt={label}
                className={`
                  w-full
                  object-cover

                  ${field === "shopBanner" ? "aspect-[3/1]" : "aspect-square"}
                `}
              />

              <button
                type="button"
                onClick={() => removeImage(field)}
                className="
                  absolute
                  right-3
                  top-3
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-black/70
                  text-white
                  backdrop-blur
                "
              >
                <X size={17} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className={`
                flex
                w-full
                flex-col
                items-center
                justify-center
                gap-2
                text-white/40

                ${field === "shopBanner" ? "aspect-[3/1]" : "aspect-square"}
              `}
            >
              <ImagePlus size={28} />

              <span className="text-xs">Upload {label}</span>
            </button>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => handleImage(field, e.target.files?.[0])}
        />

        {errors[field] && (
          <p className="mt-2 text-xs text-red-400">{errors[field]}</p>
        )}
      </div>
    );
  };

  // ============================================================
  // INPUT COMPONENT
  // ============================================================

  const Input = ({
    label,
    name,
    placeholder,
    type = "text",
  }: {
    label: string;
    name: keyof SellerForm;
    placeholder?: string;
    type?: string;
  }) => (
    <div>
      <label className="mb-2 block text-sm text-white/60">{label}</label>

      <input
        type={type}
        name={name}
        value={String(form[name] ?? "")}
        onChange={handleChange}
        placeholder={placeholder}
        className="
          h-12
          w-full
          rounded-xl
          border
          border-white/10
          bg-[#101018]
          px-4
          text-sm
          text-white
          outline-none

          placeholder:text-white/20

          focus:border-[#7771b9]
        "
      />

      {errors[name] && (
        <p className="mt-1 text-xs text-red-400">{errors[name]}</p>
      )}
    </div>
  );

  // ============================================================
  // SELECT
  // ============================================================

  const Select = ({
    label,
    name,
    children,
  }: {
    label: string;
    name: keyof SellerForm;
    children: React.ReactNode;
  }) => (
    <div>
      <label className="mb-2 block text-sm text-white/60">{label}</label>

      <select
        name={name}
        value={String(form[name] ?? "")}
        onChange={handleChange}
        className="
          h-12
          w-full
          rounded-xl
          border
          border-white/10
          bg-[#101018]
          px-4
          text-sm
          text-white
          outline-none

          focus:border-[#7771b9]
        "
      >
        {children}
      </select>

      {errors[name] && (
        <p className="mt-1 text-xs text-red-400">{errors[name]}</p>
      )}
    </div>
  );

  // ============================================================
  // TEXTAREA
  // ============================================================

  const Textarea = ({
    label,
    name,
    placeholder,
  }: {
    label: string;
    name: keyof SellerForm;
    placeholder?: string;
  }) => (
    <div>
      <label className="mb-2 block text-sm text-white/60">{label}</label>

      <textarea
        name={name}
        value={String(form[name] ?? "")}
        onChange={handleChange}
        placeholder={placeholder}
        rows={4}
        className="
          w-full
          resize-none
          rounded-xl
          border
          border-white/10
          bg-[#101018]
          p-4
          text-sm
          text-white
          outline-none

          placeholder:text-white/20

          focus:border-[#7771b9]
        "
      />

      {errors[name] && (
        <p className="mt-1 text-xs text-red-400">{errors[name]}</p>
      )}
    </div>
  );

  // ============================================================
  // STEP CONTENT
  // ============================================================

  const renderStep = () => {
    // ========================================================
    // STEP 1
    // ========================================================

    if (step === 1) {
      return (
        <div className="space-y-6">
          <StepHeader
            title="Seller Details"
            description="Tell us a little about yourself."
          />

          <div className="grid gap-6 md:grid-cols-[180px_1fr]">
            <ImageUpload
              label="Profile Photo"
              field="profileImage"
              inputRef={profileInput}
            />

            <div className="space-y-5">
              <Input
                label="Full Name"
                name="fullName"
                placeholder="Your full name"
              />

              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                />

                <Input
                  label="Phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                />
              </div>

              <Input
                label="WhatsApp Number"
                name="whatsapp"
                type="tel"
                placeholder="WhatsApp number"
              />
            </div>
          </div>
        </div>
      );
    }

    // ========================================================
    // STEP 2
    // ========================================================

    if (step === 2) {
      return (
        <div className="space-y-6">
          <StepHeader
            title="Shop Details"
            description="Set up your public shop profile."
          />

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Shop Name"
              name="shopName"
              placeholder="Your shop name"
            />

            <Select label="Shop Type" name="shopType">
              <option value="">Select shop type</option>

              <option value="fashion">Fashion</option>

              <option value="electronics">Electronics</option>

              <option value="jewellery">Jewellery</option>

              <option value="beauty">Beauty</option>

              <option value="footwear">Footwear</option>

              <option value="home">Home</option>

              <option value="other">Other</option>
            </Select>
          </div>

          <Textarea
            label="Shop Description"
            name="shopDescription"
            placeholder="Tell customers about your shop..."
          />

          <div className="grid gap-5 md:grid-cols-2">
            <ImageUpload
              label="Shop Logo"
              field="shopLogo"
              inputRef={logoInput}
            />

            <ImageUpload
              label="Shop Banner"
              field="shopBanner"
              inputRef={bannerInput}
            />
          </div>
        </div>
      );
    }

    // ========================================================
    // STEP 3
    // ========================================================

    if (step === 3) {
      return (
        <div className="space-y-6">
          <StepHeader
            title="Business Details"
            description="Add your business and GST information."
          />

          <Select label="Business Type" name="businessType">
            <option value="">Select business type</option>

            <option value="individual">Individual</option>

            <option value="proprietorship">Proprietorship</option>

            <option value="partnership">Partnership</option>

            <option value="private_limited">Private Limited</option>

            <option value="llp">LLP</option>
          </Select>

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Business / Legal Name"
              name="businessName"
              placeholder="Registered business name"
            />

            <Input
              label="PAN Number"
              name="panNumber"
              placeholder="ABCDE1234F"
            />
          </div>

          <div>
            <Input
              label="GST Number"
              name="gstNumber"
              placeholder="22AAAAA0000A1Z5"
            />

            <p className="mt-2 text-xs text-white/30">
              GST details can be skipped if GST registration is not applicable.
            </p>
          </div>

          <FileUpload
            label="GST Certificate"
            file={files.gstDocument}
            inputRef={gstInput}
            accept=".pdf,.jpg,.jpeg,.png"
            error={errors.gstDocument}
            onChange={(file) => handleDocument("gstDocument", file)}
          />
        </div>
      );
    }

    // ========================================================
    // STEP 4
    // ========================================================

    if (step === 4) {
      return (
        <div className="space-y-6">
          <StepHeader
            title="Location & Delivery"
            description="Where is your shop located?"
          />

          <div className="grid gap-5 md:grid-cols-3">
            <Input label="State" name="state" placeholder="Kerala" />

            <Input label="District" name="district" placeholder="Thrissur" />

            <Input label="City" name="city" placeholder="Irinjalakuda" />
          </div>

          <Input label="Pincode" name="pincode" placeholder="680121" />

          <Textarea
            label="Shop Address"
            name="address"
            placeholder="Full shop address"
          />

          <Input
            label="Landmark"
            name="landmark"
            placeholder="Near bus stand..."
          />

          <div className="grid gap-4 md:grid-cols-2">
            <Toggle
              title="Delivery Available"
              description="Customers can request delivery."
              active={form.deliveryAvailable}
              onClick={() =>
                handleBooleanChange(
                  "deliveryAvailable",
                  !form.deliveryAvailable,
                )
              }
            />

            <Toggle
              title="Shop Pickup"
              description="Customers can collect orders."
              active={form.pickupAvailable}
              onClick={() =>
                handleBooleanChange("pickupAvailable", !form.pickupAvailable)
              }
            />
          </div>
        </div>
      );
    }

    // ========================================================
    // STEP 5
    // ========================================================

    if (step === 5) {
      return (
        <div className="space-y-6">
          <StepHeader
            title="Bank Details"
            description="Used for receiving marketplace payments."
          />

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Account Holder Name"
              name="accountHolder"
              placeholder="Name on bank account"
            />

            <Input
              label="Bank Name"
              name="bankName"
              placeholder="State Bank of India"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Account Number"
              name="accountNumber"
              type="password"
              placeholder="Account number"
            />

            <Input
              label="Confirm Account Number"
              name="confirmAccountNumber"
              type="password"
              placeholder="Re-enter account number"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input label="IFSC Code" name="ifsc" placeholder="SBIN0000000" />

            <Input label="UPI ID" name="upi" placeholder="shop@upi" />
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs leading-5 text-amber-200/70">
            Make sure your bank account details belong to the seller/business
            receiving the payments.
          </div>
        </div>
      );
    }

    // ========================================================
    // STEP 6
    // ========================================================

    if (step === 6) {
      return (
        <div className="space-y-6">
          <StepHeader
            title="Verification Documents"
            description="Upload documents required for seller verification."
          />

          <div className="grid gap-5 md:grid-cols-2">
            <FileUpload
              label="Aadhar Front"
              file={files.aadharFront}
              inputRef={aadharFrontInput}
              accept=".jpg,.jpeg,.png,.pdf"
              error={errors.aadharFront}
              onChange={(file) => handleDocument("aadharFront", file)}
            />

            <FileUpload
              label="Aadhar Back"
              file={files.aadharBack}
              inputRef={aadharBackInput}
              accept=".jpg,.jpeg,.png,.pdf"
              error={errors.aadharBack}
              onChange={(file) => handleDocument("aadharBack", file)}
            />

            <FileUpload
              label="PAN Card"
              file={files.panDocument}
              inputRef={panInput}
              accept=".jpg,.jpeg,.png,.pdf"
              error={errors.panDocument}
              onChange={(file) => handleDocument("panDocument", file)}
            />

            <FileUpload
              label="GST Certificate"
              file={files.gstDocument}
              inputRef={gstInput}
              accept=".jpg,.jpeg,.png,.pdf"
              error={errors.gstDocument}
              onChange={(file) => handleDocument("gstDocument", file)}
            />
          </div>

          <FileUpload
            label="Shop License"
            file={files.shopLicense}
            inputRef={licenseInput}
            accept=".jpg,.jpeg,.png,.pdf"
            error={errors.shopLicense}
            onChange={(file) => handleDocument("shopLicense", file)}
          />
        </div>
      );
    }

    // ========================================================
    // STEP 7
    // ========================================================

    return (
      <div className="space-y-6">
        <StepHeader
          title="Review Your Details"
          description="Check everything before submitting your seller profile."
        />

        <div className="grid gap-4 md:grid-cols-2">
          <ReviewCard
            title="Seller"
            items={[
              ["Name", form.fullName],
              ["Email", form.email],
              ["Phone", form.phone],
            ]}
          />

          <ReviewCard
            title="Shop"
            items={[
              ["Shop", form.shopName],
              ["Type", form.shopType],
            ]}
          />

          <ReviewCard
            title="Business"
            items={[
              ["Business", form.businessName],
              ["GST", form.gstNumber || "Not provided"],
              ["PAN", form.panNumber],
            ]}
          />

          <ReviewCard
            title="Location"
            items={[
              ["State", form.state],
              ["District", form.district],
              ["City", form.city],
              ["Pincode", form.pincode],
            ]}
          />

          <ReviewCard
            title="Delivery"
            items={[
              [
                "Delivery",
                form.deliveryAvailable ? "Available" : "Not available",
              ],
              ["Pickup", form.pickupAvailable ? "Available" : "Not available"],
            ]}
          />

          <ReviewCard
            title="Documents"
            items={[
              [
                "Aadhar",
                files.aadharFront && files.aadharBack ? "Uploaded" : "Missing",
              ],
              ["PAN", files.panDocument ? "Uploaded" : "Missing"],
              ["GST", files.gstDocument ? "Uploaded" : "Not provided"],
            ]}
          />
        </div>

        {errors.submit && (
          <div className="rounded-xl bg-red-500/10 p-4 text-sm text-red-300">
            {errors.submit}
          </div>
        )}
      </div>
    );
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <main className="min-h-screen bg-[#0b0b12] px-3 py-6 text-white md:px-6 md:py-10">
      <div className="mx-auto max-w-6xl">
        {/* ==================================================== */}
        {/* HEADER */}
        {/* ==================================================== */}

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Become a Seller</h1>

            <p className="mt-1 text-sm text-white/40">
              Set up your seller profile and shop.
            </p>
          </div>

          {saved && (
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <Check size={14} />
              Draft saved
            </div>
          )}
        </div>

        {/* ==================================================== */}
        {/* PROGRESS */}
        {/* ==================================================== */}

        <div className="mb-8 rounded-3xl border border-white/10 bg-[#181823] p-4 md:p-6">
          <div className="relative">
            {/* LINE */}

            <div
              className="
              absolute
              left-[7%]
              right-[7%]
              top-5
              h-px
              bg-white/10
            "
            />

            <div
              className="
                absolute
                left-[7%]
                top-5
                h-px
                bg-[#7771b9]
                transition-all
                duration-500
              "
              style={{
                width: `${((step - 1) / (steps.length - 1)) * 86}%`,
              }}
            />

            {/* STEPS */}

            <div
              className="
              relative
              grid
              grid-cols-7
              gap-1
            "
            >
              {steps.map(({ id, title, icon: Icon }) => {
                const completed = id < step;

                const active = id === step;

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      if (id < step) {
                        setStep(id);
                      }
                    }}
                    className="
                        flex
                        min-w-0
                        flex-col
                        items-center
                      "
                  >
                    <div
                      className={`
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-full
                          border
                          transition

                          ${
                            completed
                              ? "border-[#7771b9] bg-[#7771b9] text-white"
                              : active
                                ? "border-[#aaa5ed] bg-[#7771b9]/20 text-[#aaa5ed]"
                                : "border-white/10 bg-[#101018] text-white/30"
                          }
                        `}
                    >
                      {completed ? <Check size={17} /> : <Icon size={17} />}
                    </div>

                    <span
                      className={`
                          mt-2
                          hidden
                          text-center
                          text-[10px]
                          sm:block

                          ${active ? "text-white" : "text-white/30"}
                        `}
                    >
                      {title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* CONTENT */}
        {/* ==================================================== */}

        <div
          className="
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-[#181823]
        "
        >
          <div className="p-4 md:p-8">{renderStep()}</div>

          {/* ================================================== */}
          {/* NAVIGATION */}
          {/* ================================================== */}

          <div
            className="
            flex
            flex-col-reverse
            gap-3
            border-t
            border-white/10
            p-4

            sm:flex-row
            sm:items-center
            sm:justify-between

            md:px-8
          "
          >
            {/* LEFT */}

            <div className="flex items-center gap-2">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="
                    flex
                    h-11
                    items-center
                    gap-2
                    rounded-xl
                    bg-white/5
                    px-4
                    text-sm
                    text-white/70
                    transition
                    hover:bg-white/10
                    hover:text-white
                  "
                >
                  <ChevronLeft size={17} />
                  Previous
                </button>
              )}

              {step < 6 && (
                <button
                  type="button"
                  onClick={handleSkip}
                  className="
                    h-11
                    rounded-xl
                    px-4
                    text-sm
                    text-white/40
                    transition
                    hover:text-white
                  "
                >
                  Skip
                </button>
              )}
            </div>

            {/* RIGHT */}

            {step < 7 ? (
              <button
                type="button"
                onClick={handleNext}
                className="
                  flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#7771b9]
                  px-6
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#8580c9]
                "
              >
                Continue
                <ChevronRight size={17} />
              </button>
            ) : (
              <button
                type="button"
                disabled={submitting}
                onClick={handleSubmit}
                className="
                  flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#7771b9]
                  px-6
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#8580c9]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <Upload size={17} />

                {submitting ? "Submitting..." : "Submit Seller Profile"}
              </button>
            )}
          </div>
        </div>

        {/* ==================================================== */}
        {/* FOOTER NOTE */}
        {/* ==================================================== */}

        <p
          className="
          mt-5
          text-center
          text-xs
          leading-5
          text-white/25
        "
        >
          Your progress is automatically saved on this device.
        </p>
      </div>
    </main>
  );
}

// ============================================================
// STEP HEADER
// ============================================================

function StepHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold md:text-2xl">{title}</h2>

      <p className="mt-1 text-sm text-white/40">{description}</p>
    </div>
  );
}

// ============================================================
// TOGGLE
// ============================================================

function Toggle({
  title,
  description,
  active,
  onClick,
}: {
  title: string;
  description: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        items-center
        justify-between
        gap-4
        rounded-2xl
        border
        p-4
        text-left
        transition

        ${
          active
            ? "border-[#7771b9]/50 bg-[#7771b9]/10"
            : "border-white/10 bg-black/20"
        }
      `}
    >
      <div>
        <p className="text-sm font-medium">{title}</p>

        <p className="mt-1 text-xs text-white/30">{description}</p>
      </div>

      <div
        className={`
          flex
          h-6
          w-11
          shrink-0
          items-center
          rounded-full
          p-1
          transition

          ${active ? "bg-[#7771b9]" : "bg-white/10"}
        `}
      >
        <div
          className={`
            h-4
            w-4
            rounded-full
            bg-white
            transition-transform

            ${active ? "translate-x-5" : "translate-x-0"}
          `}
        />
      </div>
    </button>
  );
}

// ============================================================
// REVIEW CARD
// ============================================================

function ReviewCard({
  title,
  items,
}: {
  title: string;
  items: [string, string][];
}) {
  return (
    <div
      className="
      rounded-2xl
      border
      border-white/10
      bg-black/20
      p-4
    "
    >
      <h3 className="mb-4 text-sm font-semibold">{title}</h3>

      <div className="space-y-3">
        {items.map(([label, value]) => (
          <div
            key={label}
            className="
                flex
                items-start
                justify-between
                gap-4
                text-sm
              "
          >
            <span className="text-white/30">{label}</span>

            <span
              className="
                max-w-[65%]
                break-words
                text-right
                text-white/80
              "
            >
              {value || "Not provided"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
