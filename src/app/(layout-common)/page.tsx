"use client";

import PaymentProcessing from "@/components/features/payment/PaymentProcessing";
import Icon from "@/components/share/Icon";
import ModalDrawerWrapper from "@/components/share/ModalDrawerWrapper";
import TextField from "@/components/share/TextField";
import { PAYMENT_STATUS } from "@/constant/enum";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import useNotification from "@/hooks/useNotification";
import fetchApi from "@/libs/api/sample";
import { preOrderSchema } from "@/libs/zod";
import { PreOrderForm } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "antd";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
const { Option } = Select;
import QRCode from "react-qr-code";

enum STEP {
  CHOOSE_NETWORK = 1,
  PAY_WITH_USDT = 2,
  PROCESSING = 3,
}

const benefits = [
  {
    id: 1,
    icon: "seal-percent",
    description: (
      <p>
        A <span className="text-brand_1 font-semibold">30%</span> early bird
        discount
      </p>
    ),
  },
  {
    id: 2,
    icon: "crown",
    description: (
      <p>
        <span className="text-brand_1 font-semibold">Priority access</span> to
        our upcoming features
      </p>
    ),
  },
  {
    id: 3,
    icon: "headset",
    description: (
      <p>
        <span className="text-brand_1 font-semibold">Personalized support</span>{" "}
        from our team
      </p>
    ),
  },
  {
    id: 4,
    icon: "arrows-counter-clockwise",
    description: <p>Regular updates and clear guidance</p>,
  },
];

const packages = [
  {
    id: 1,
    title: "03 month",
    price: "450$",
    priceNumber: 450,
    discount: "Saves - 60$",
  },
  {
    id: 2,
    title: "06 month",
    price: "950$",
    priceNumber: 950,
    discount: "Saves - 100$",
  },
  {
    id: 3,
    title: "12 month",
    price: "1.800$",
    priceNumber: 1800,
    discount: "Saves - 250$",
  },
];

const networks = [
  {
    key: "bsc1",
    name: "BSC",
    chain: "BNB Smart Chain (BEP 20)",
    time: "~1 mins",
    confirmations: "15 block confirmation/s",
  },
  // {
  //   key: "sol",
  //   name: "SOL",
  //   chain: "Sonala",
  //   time: "~1 mins",
  //   confirmations: "15 block confirmation/s",
  // },
  // {
  //   key: "bsc2",
  //   name: "BSC",
  //   chain: "BNB Smart Chain",
  //   time: "~1 mins",
  //   confirmations: "15 block confirmation/s",
  // },
  // {
  //   key: "bsc3",
  //   name: "BSC",
  //   chain: "BNB Smart Chain",
  //   time: "~1 mins",
  //   confirmations: "15 block confirmation/s",
  // },
];

const networkTabs = [
  {
    value: "avax",
    label: "AVAX C-chain",
  },
  {
    value: "bnb",
    label: "BNB Smart Chain )BEP 20)",
  },
];

const defaultValues = {
  name: "",
  email: "",
  phone: "",
  ref_code: "",
};

export default function Home() {
  const [isOpenPreorderModal, setIsOpenPreorderModal] = useState(false);
  const [isOpenPaymentModal, setIsOpenPaymentModal] = useState(false);
  const [isOpenProcessingModal, setIsOpenProcessingModal] = useState(false);

  const [activePackage, setActivePackage] = useState(packages[0]);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [copy, statusCopy] = useCopyToClipboard();
  const { openSuccess } = useNotification();

  const [paymentStatus, setPaymentStatus] = useState<PAYMENT_STATUS>();
  const [isLoading, setIsLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>("");

  const [userId, setUserId] = useState<number | null>();

  console.log({ activePackage, selectedValue, paymentStatus, walletAddress });

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<PreOrderForm>({
    resolver: zodResolver(preOrderSchema),
    defaultValues: defaultValues,
    mode: "onBlur",
  });

  const handleCopyWalletAddress = () => {
    copy("walletAddress");
    if (statusCopy.success) openSuccess("Copied!", "");
  };

  const checkPaymentStatus = async () => {
    try {
      // Todo: fetch payment status
      const res = await fetchApi.post("/waitlist/complete", {
        userId: userId,
      });
      if (res.completed) {
        setPaymentStatus(PAYMENT_STATUS.COMPLETE);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      paymentStatus === PAYMENT_STATUS.COMPLETE ||
      paymentStatus === PAYMENT_STATUS.PROCESSING ||
      paymentStatus === PAYMENT_STATUS.CANCELED
    ) {
      setIsOpenProcessingModal(true);
    }
  }, [paymentStatus]);

  useEffect(() => {
    if (!walletAddress.length) return;

    const intervalId = setInterval(() => {
      checkPaymentStatus();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [walletAddress]);

  const fetchWalletAddress = async () => {
    try {
      setIsLoading(true);
      // Todo: Fetch API wallet address
      const res = await fetchApi.post("/waitlist/get-wallet");
      if (res) {
        setWalletAddress(res.address);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: PreOrderForm) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
      };
      // Todo: Call API add waitlist user
      const res = await fetchApi.post("/register-waitlist", payload);
      setIsOpenPreorderModal(false);
      setIsOpenPaymentModal(true);
      setUserId(res.userId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedValue) {
      fetchWalletAddress();
    }
  }, [selectedValue]);

  return (
    <main className="flex flex-col items-center">
      <Icon
        name="blur-logo"
        width="296px"
        height="220px"
        className="mt-[68px] mb-[22px]"
      />
      <div className="px-4 sm:px-0 sm:w-[740px] flex flex-col gap-12 ">
        <div className="flex flex-col items-center">
          <p className="bg-gradient_title bg-clip-text text-transparent text-[48px] leading-[58px] font-bold mb-4 text-center">
            Join our waitlist!
          </p>
          <p className="text-center">
            Join the S-mining waitlist today and get ready for a better way to
            mine.
          </p>
        </div>
        <div>
          <p className="text-brand_1 text-[16px]/[22px] font-semibold mb-6 text-center">
            As an early member, you will receive
          </p>
          <div className="flex gap-3 flex-wrap">
            {benefits.map((item) => (
              <div
                key={item.id}
                className="p-3  border border-[#525362] rounded-2xl bg-gradient_tab flex flex-col items-start flex-wrap min-w-[174px] w-[174px]"
              >
                <Icon
                  name={item.icon}
                  width="24px"
                  height="24px"
                  className="mb-4"
                />
                {item.description}
              </div>
            ))}
          </div>
        </div>
        <button
          className="bg-gradien_button hover:bg-gradien_button_hover font-semibold text-base w-[200px] h-[48px] sm:h-[56px] flex items-center justify-center rounded-lg transition-all duration-300 mx-auto"
          onClick={() => setIsOpenPreorderModal(true)}
        >
          Join now!
        </button>
      </div>
      <ModalDrawerWrapper
        title={"Pre-order waitlist"}
        drawerPlacement="bottom"
        open={isOpenPreorderModal}
        modalWidth={600}
        setOpen={(value) => {
          setIsOpenPreorderModal(value);
          reset();
        }}
      >
        <div className="flex flex-col gap-6 py-6 ">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Your name"
                className="px-6"
                error={!!errors.name?.message}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Email"
                className="px-6"
                error={!!errors.email?.message}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Phone"
                className="px-6"
                error={!!errors.phone?.message}
                helperText={errors.phone?.message}
              />
            )}
          />
          <Controller
            name="ref_code"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Refcode"
                className="px-6"
                error={!!errors.ref_code?.message}
                helperText={errors.ref_code?.message}
              />
            )}
          />
          <div className="flex gap-4 px-6">
            {packages.map((item) => (
              <div
                key={item.id}
                className={classNames(
                  "p-3 rounded-lg border border-[#EAEAEA] flex flex-col gap-1 flex-1 cursor-pointer",
                  activePackage.id === item.id &&
                    "bg-[#F5F5FE] rounded-lg border !border-[#5054FD]"
                )}
                onClick={() => setActivePackage(item)}
              >
                <p className="text-[20px]/[24px] sm:text-[24px]/[29px] font-semibold">
                  {item.title}
                </p>
                <p className="text-[#757575] text-[13px]/[18px]">
                  {item.price}
                </p>
                <p className="text-brand_2 text-[10px]/[14px]">
                  {item.discount}
                </p>
              </div>
            ))}
          </div>
          <div
            className="pt-6 border-t px-6 sm:px-0"
            onClick={handleSubmit(onSubmit)}
          >
            <button className="bg-brand_2 rounded-lg text-base font-semibold text-[#F3F3F3] w-full  sm:w-[200px] h-10 flex items-center justify-center mx-auto">
              Buy
            </button>
          </div>
        </div>
      </ModalDrawerWrapper>
      <ModalDrawerWrapper
        title={"Payment"}
        drawerPlacement="bottom"
        open={isOpenPaymentModal}
        modalWidth={600}
        setOpen={(value) => {
          setIsOpenPaymentModal(value);
          setActivePackage(packages[0]);
          setWalletAddress("");
          setSelectedValue(null);
          reset();
        }}
      >
        <div className="flex flex-col gap-6 p-6 ">
          <p className="text-[16px]/[22px] text-[#1E1E1E]">
            Payment amount:{" "}
            <span className="text-brand_2 font-semibold">{`$${activePackage.priceNumber}`}</span>
          </p>
          {/* Step:1 */}
          <div className="flex gap-4">
            <div className="min-w-[28px] h-[28px] rounded-full font-semibold bg-brand_2 text-white flex items-center justify-center">
              1
            </div>
            <div className="w-full">
              <p className="text-[20px]/[24px] font-bold mb-4">
                Select network
              </p>
              <Select
                placeholder="Choose network"
                style={{ width: "100%", height: "54px" }}
                optionLabelProp="label"
                value={selectedValue}
                onChange={(value) => {
                  setSelectedValue(value);
                }}
              >
                {networks.map((network) => (
                  <Option
                    key={network.key}
                    value={network.key}
                    label={network.name}
                  >
                    <div className="flex flex-col p-2 ">
                      <div className="flex justify-between font-semibold text-[14px]/[20px]">
                        <span>{network.name}</span>
                        <span>{network.time}</span>
                      </div>
                      <div className="text-[11px]/[15px] text-[#B3B3B3] flex justify-between">
                        <span>{network.chain}</span>
                        <span>{network.confirmations}</span>
                      </div>
                    </div>
                  </Option>
                ))}
              </Select>
              {/* <div className="flex gap-2 mt-2">
                {networkTabs.map((item) => (
                  <div
                    key={item.value}
                    className="border border-[#D9D9D9] rounded-lg w-fit px-4 py-2 text-[14px]/[16px] cursor-pointer"
                  >
                    {item.label}
                  </div>
                ))}
              </div> */}
            </div>
          </div>
          {/* Step:2 */}
          <div className="flex gap-4">
            <div
              className={classNames(
                "min-w-[28px] h-[28px] rounded-full font-semibold bg-brand_2 text-white flex items-center justify-center opacity-40",
                selectedValue && "!opacity-100"
              )}
            >
              2
            </div>
            <div className="flex flex-col gap-4 w-full">
              <p
                className={classNames(
                  "text-[#1E1E1E] text-[20px]/[24px] font-bold opacity-40",
                  selectedValue && "!opacity-100"
                )}
              >
                Deposit Address
              </p>
              {selectedValue ? (
                <div className="flex flex-col items-center sm:flex-row gap-3 border border-[#EAEAEA] rounded-lg p-4">
                  <QRCode
                    value={walletAddress}
                    style={{ width: "180px", height: "180px", padding: "12px" }}
                  />
                  <div className="flex items-center gap-6 lg:gap-3">
                    <div className="max-w-[256px]">
                      <p className="text-xs text-[#B3B3B3] mb-1">Address</p>
                      <p className="break-words">{walletAddress}</p>
                    </div>
                    <Icon
                      name="copy-simple"
                      width="16px"
                      height="16px"
                      className="cursor-pointer"
                      onClick={() => handleCopyWalletAddress()}
                    />
                  </div>
                </div>
              ) : (
                <div className="h-[277px]"></div>
              )}
            </div>
          </div>
        </div>
      </ModalDrawerWrapper>
      {paymentStatus && (
        <ModalDrawerWrapper
          title=""
          hiddenClose={true}
          drawerPlacement="bottom"
          open={isOpenProcessingModal}
          modalWidth={400}
          setOpen={(value) => {
            setIsOpenPaymentModal(value);
          }}
        >
          <PaymentProcessing
            paymentAmount={activePackage.priceNumber}
            paymentStatus={paymentStatus}
            onCancel={() => {
              setIsOpenProcessingModal(false);
              setIsOpenPaymentModal(false);
              setWalletAddress("");
              setSelectedValue(null);
              reset();
            }}
          />
        </ModalDrawerWrapper>
      )}
    </main>
  );
}
